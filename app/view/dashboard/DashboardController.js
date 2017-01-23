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
        showNavigation: false
    },

    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        if (oldValue === undefined) {
            return;
        }

        var refs = this.getReferences();

        refs.adminLogo.toggleCls('admin-dashboard-logo-collapsed');
        refs.adminMenu.toggleCls('admin-dashboard-menu-collapsed');
        refs.adminMenu.element.on({
            transitionend: function () {
                refs.adminNavigation.setMicro(showNavigation);
            },
            single: true
        });

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
    }
});
