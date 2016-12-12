
Ext.define('Admin.view.dashboard.Dashboard',{
    extend: 'Ext.Container',
    xtype: 'admin.dashboard',

    requires: [
        'Admin.view.dashboard.DashboardController',
        'Admin.view.dashboard.DashboardModel'
    ],

    controller: 'dashboard-dashboard',
    viewModel: {
        type: 'dashboard-dashboard'
    },

    layout: {
        type: 'hbox'
    },

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 10 0 0',
            listeners: {
                tap: 'onToggleNavigationSize'
            }
        }]
    }, {
        xtype: 'container',
        reference: 'menu',
        shadow: true,
        items: [{
            xtype: 'treelist',
            reference: 'navigation',
            expanderFirst: false,
            expanderOnly: false,
            listeners: {
                itemclick: 'onNavigationItemClick',
                selectionchange: 'onNavigationSelectionChange'
            },
            store: 'Navigation'
        }]
    }, {
        xtype: 'navigationview',
        navigationBar: false,
        reference: 'card',
        flex: 1,
        layout: {
            type: 'card',
            animation: 'fade'
        }
    }]
});
