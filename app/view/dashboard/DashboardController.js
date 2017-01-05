Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboard',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    config: {
        showNavigation: false,
        containerHeight: null
    },

    onNavigationItemClick: Ext.emptyFn,

    onNavigationSelectionChange: function (tree, node) {
        var to = node && node.get('viewType');

        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    onLogout: function () {
        var view = this.getView();

        view.setMasked({
            xtype: 'loadmask',
            message: 'Выход...'
        });

        Ext.Ajax.request({
            url: '/user/signout'
            //url: 'resources/data/authentication/login/success.json'
        }).then(function (response, opts) {
            var data = Ext.decode(response.responseText);
            view.setMasked(false);

            if (data.success) {
                window.location.reload();
            } else {
                Admin.Overlay();
            }
        }, function (response, opts) {
            view.setMasked(false);
            Admin.Overlay();
        });
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        if (oldValue === undefined) {
            return;
        }

        var me = this,
            refs = this.getReferences(),
            isFloated = refs.menu.getFloated();

        if (isFloated) {
            Ext.Viewport.setMasked(true);
            Ext.Viewport.getMasked().element.on({
                tap: me.onToggleNavigationSize,
                scope: me,
                single: true
            });

            if (showNavigation) {
                refs.menu.show();
                refs.menu.translate(-200, 0);
                refs.menu.translate(0, 0, {duration: 200});
                refs.card.translate(180, 0, {duration: 200});
                refs.adminMainBar.translate(180, 0, {duration: 200});
            } else {
                refs.menu.getTranslatable().on('animationend', function() {
                    refs.menu.hide();
                    Ext.Viewport.setMasked(false);
                }, me, {
                    single: true
                });
                refs.menu.translate(-200, 0, {duration: 200});
                refs.card.translate(0, 0, {duration: 200});
                refs.adminMainBar.translate(0, 0, {duration: 200});
            }
        } else {
            refs.adminLogo.toggleCls('admin-dashboard-logo-collapsed');
            refs.menu.toggleCls('main-dashboard-menu-collapsed');
            refs.menu.element.on({
                transitionend: function () {
                    refs.navigation.setMicro(showNavigation);
                },
                single: true
            });
        }

    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            card = refs.card,
            menu = refs.menu,
            navigation = refs.navigation,
            store = navigation.getStore(),
            node = store.findNode('viewType', hashTag),
            item = card.child('component[routeId=' + hashTag + ']');

        if (!item) {
            item = card.add({
                xtype: node.get('viewType'),
                routeId: hashTag
            });
        }

        card.setActiveItem(item);
        navigation.setSelection(node);
    },

    onContainerResize: function (cmp) {
        if (Ext.platformTags.desktop) {
            return;
        }

        this.setContainerHeight(cmp.getSize().height);
    },


    updateContainerHeight: function (height, oldValue) {
        if (oldValue === undefined) {
            return;
        }

        var refs = this.getReferences();

        // Верхняя панель
        if (height < 300) {
            refs.adminMainBar.setHeight(0);
        } else {
            refs.adminMainBar.setHeight(60);
        }
    },

    onDashboardPainted: function () {
        if (!window.location.hash) {
            this.redirectTo("profile");
        }
    }
});
