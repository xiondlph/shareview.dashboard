
Ext.define('Admin.view.dashboard.Dashboard',{
    extend: 'Ext.panel.Panel',
    xtype: 'admindashboard',

    requires: [
        'Admin.view.dashboard.DashboardController',
        'Admin.view.dashboard.DashboardModel'
    ],

    controller: 'dashboard-dashboard',
    viewModel: {
        type: 'dashboard-dashboard'
    },

    html: 'Hello, World!!'
});
