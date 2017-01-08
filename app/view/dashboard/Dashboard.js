
Ext.define('Admin.view.dashboard.Dashboard',{
    extend: 'Ext.Container',
    xtype: 'admin.dashboard',

    requires: [
        'Ext.plugin.Responsive',
        'Admin.ux.list.Tree',
        'Admin.view.dashboard.DashboardController',
        'Admin.view.dashboard.DashboardModel'
    ],

    controller: 'dashboard-dashboard',
    viewModel: {
        type: 'dashboard-dashboard'
    },

    listeners: {
        painted: 'onDashboardPainted'
    },

    layout: 'hbox',
    cls: 'admin-dashboard',

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
        cls: 'admin-dashboard-menu',
        reference: 'adminMenu',
        scrollable: {
            direction: 'vertical'
        },
        items: [{
            xtype: 'admin.treelist',
            cls: 'admin-dashboard-menu-navigation',
            reference: 'adminNavigation',
            listeners: {
                itemclick: 'onNavigationItemClick',
                selectionchange: 'onNavigationSelectionChange'
            },
            store: 'Navigation'
        }]
    }, {
        xtype: 'container',
        reference: 'adminCard',
        cls: 'admin-dashboard-card',
        flex: 1,
        layout: {
            type: 'card',
            animation: 'fade'
        }
    }]
});
