Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboard',

    requires: [
        'Admin.mixin.Dashboard'
    ],

    mixins: [
        'Admin.mixin.Dashboard'
    ],

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

    }
});
