
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

    cls: 'admin-dashboard',
    scrollable: true,
    listeners: {
        painted: 'onDashboardPainted'
    },

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        reference: 'adminMainBar',
        cls: 'admin-dashboard-bar',
        items: [{
            xtype: 'component',
            reference: 'adminLogo',
            cls: 'admin-dashboard-logo',
            html: 'Shareview'
        }, {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleNavigationSize'
            }
        }, '->', {
            xtype: 'component',
            bind: {
                html: '{profile.email}'
            }
        }, {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-power-off',
            margin: '0 10',
            listeners: {
                tap: 'onLogout'
            }
        }]
    }, {
        xtype: 'container',
        cls: 'main-dashboard-menu',
        reference: 'menu',
        shadow: true,
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
        xtype: 'container',
        reference: 'card',
        cls: 'admin-dashboard-card',
        flex: 1,
        layout: {
            type: 'card',
            animation: 'fade'
        }
    }]
});
