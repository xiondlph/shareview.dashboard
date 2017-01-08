Ext.define('Admin.view.mobile.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobile-dashboard-dashboard',

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

    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        if (oldValue === undefined) {
            return;
        }

        var me = this,
            refs = this.getReferences();

        Ext.Viewport.setMasked(true);
        Ext.Viewport.getMasked().element.on({
            tap: me.onToggleNavigationSize,
            scope: me,
            single: true
        });

        if (showNavigation) {
            refs.adminMenu.show();
            refs.adminMenu.translate(-200, 0);
            refs.adminMenu.translate(0, 0, {duration: 200});
            refs.adminCard.translate(180, 0, {duration: 200});
            refs.adminMainBar.translate(180, 0, {duration: 200});
        } else {
            refs.adminMenu.getTranslatable().on('animationend', function() {
                refs.adminMenu.hide();
                Ext.Viewport.setMasked(false);
            }, me, {
                single: true
            });
            refs.adminMenu.translate(-200, 0, {duration: 200});
            refs.adminCard.translate(0, 0, {duration: 200});
            refs.adminMainBar.translate(0, 0, {duration: 200});
        }
    },

    onNavigationItemClick: Ext.emptyFn,

    onNavigationSelectionChange: function (tree, node) {
        var to = node && node.get('viewType');

        if (to) {
            this.redirectTo(to);
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            adminCard = refs.adminCard,
            adminNavigation = refs.adminNavigation,
            store = adminNavigation.getStore(),
            node = store.findNode('viewType', hashTag),
            item = adminCard.child('component[routeId=' + hashTag + ']');

        if (!item) {
            item = adminCard.add({
                xtype: node.get('viewType'),
                routeId: hashTag
            });
        }

        adminCard.setActiveItem(item);
        adminNavigation.setSelection(node);
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
        });
    },

    onDashboardPainted: function () {
        if (!window.location.hash) {
            this.redirectTo("profile");
        }
    },

    onContainerResize: function (cmp) {
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
    }
});
