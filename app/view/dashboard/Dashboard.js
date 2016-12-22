
Ext.define('Admin.view.dashboard.Dashboard',{
    extend: 'Ext.Container',
    xtype: 'admin.dashboard',

    requires: [
        'Ext.plugin.Responsive',
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
        reference: 'adminMainBar',
        cls: 'admin-bar',
        items: [{
            xtype: 'component',
            reference: 'adminLogo',
            cls: 'admin-logo',
            html: 'Shareview'
        }, {
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
        cls: 'main-dashboard-menu',
        reference: 'menu',
        shadow: true,
        floated: true,
        plugins: 'responsive',
        responsiveConfig: {
            'desktop': {
                floated: false
            }
        },
        items: [{
            xtype: 'treelist',
            cls: 'main-dashboard-menu-navigation',
            reference: 'navigation',
            expanderFirst: false,
            expanderOnly: false,
            ui: 'nav',
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
