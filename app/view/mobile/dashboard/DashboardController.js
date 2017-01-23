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

        var refs = this.getReferences();

        Ext.Viewport.setMasked(true);
        Ext.Viewport.getMasked().element.on({
            tap: this.onToggleNavigationSize,
            scope: this,
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
            }, this, {
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

        var refs = this.getReferences(),
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

        Admin.Overlay.confirm('Выйти из панели управления?', function (btn) {
            if (btn === 'ok') {
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
                        Admin.Overlay.error();
                    }
                }, function (response, opts) {
                    view.setMasked(false);
                });
            }
        });
    },

    onDashboardPainted: function () {
        var hash = Ext.util.History.getHash();

        if (Ext.isEmpty(hash)) {
            this.redirectTo("profile");
        } else {
            this.setCurrentView(hash);
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
        if (height < 200) {
            refs.adminMainBar.setHeight(0);
        } else {
            refs.adminMainBar.setHeight(60);
        }
    }
});
