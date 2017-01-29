Ext.define('Admin.view.mobile.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobile-dashboard-dashboard',

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
        showNavigation: false,
        containerHeight: null
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
