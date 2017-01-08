
Ext.define('Admin.view.mobile.dashboard.Dashboard',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Admin.view.mobile.dashboard.DashboardController',
        'Admin.view.dashboard.DashboardModel'
    ],

    controller: 'mobile-dashboard-dashboard',
    viewModel: {
        type: 'dashboard-dashboard'
    },

    listeners: {
        resize: 'onContainerResize',
        painted: 'onDashboardPainted'
    },

    layout: 'hbox',
    cls: 'admin-dashboard',
    padding: 0,

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        reference: 'adminMainBar',
        cls: 'admin-dashboard-bar',
        items: [{
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
    },  {
        xtype: 'container',
        cls: 'admin-dashboard-menu',
        reference: 'adminMenu',
        floated: true,
        height: '100%',
        scrollable: {
            direction: 'vertical'
        },
        items: [{
            xtype: 'component',
            cls: 'admin-dashboard-logo',
            html: 'Shareview'
        }, {
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
