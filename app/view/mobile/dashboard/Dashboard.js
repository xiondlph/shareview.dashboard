
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
        reference: 'adminMainBar',
        docked: 'top',
        cls: 'admin-dashboard-bar',
        padding: 0,
        height: 60,
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
        items: [{
            xtype: 'component',
            cls: 'admin-dashboard-logo',
            html: 'Shareview'
        }, {
            xtype: 'container',
            height: '100%',
            cls: 'admin-dashboard-menu-container',
            padding: '0 0 60 0',
            scrollable: {
                direction: 'vertical'
            },
            items: [{
                xtype: 'admin.treelist',
                reference: 'adminNavigation',
                cls: 'admin-dashboard-menu-navigation',
                listeners: {
                    itemclick: 'onNavigationItemClick',
                    selectionchange: 'onNavigationSelectionChange'
                },
                store: 'Navigation'
            }]
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
