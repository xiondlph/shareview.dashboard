
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
        resize: 'onContainerResize',
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
            html: 'Shareview',
            hidden: true,
            plugins: 'responsive',
            responsiveConfig: {
                'desktop': {
                    hidden: false
                }
            }
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
        floated: true,
        plugins: 'responsive',
        responsiveConfig: {
            'desktop': {
                floated: false
            }
        },
        items: [{
            xtype: 'component',
            cls: 'admin-dashboard-logo',
            html: 'Shareview',
            hidden: false,
            plugins: 'responsive',
            responsiveConfig: {
                'desktop': {
                    hidden: true
                }
            }
        }, {
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
