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

    updateShowNavigation: function (showNavigation, oldValue) {
        //
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
    }
});
