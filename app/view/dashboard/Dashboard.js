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

    fullscreen: true,
    scrollable: {
        direction: 'vertical'
    },
    layout: 'hbox',
    cls: 'admin-dashboard',

    items: [{
        xtype: 'toolbar',
        reference: 'adminMainBar',
        docked: 'top',
        cls: 'admin-dashboard-bar',
        padding: 0,
        height: 60,
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
        reference: 'adminMenu',
        cls: 'admin-dashboard-menu',
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
        flex: 1,
        baseCls: 'admin-dashboard-card',
        layout: {
            type: 'card',
            animation: 'fade'
        }
    }]
});
