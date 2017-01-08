Ext.define('Admin.profile.Mobile', {
    extend: 'Ext.app.Profile',

    requires: [
        'Admin.view.mobile.*'
    ],

    views: {
        login: 'Admin.view.mobile.authentication.Login',
        'admin.dashboard': 'Admin.view.mobile.dashboard.Dashboard',
        profile: 'Admin.view.mobile.profile.Profile'
    },

    isActive: function(app) {
        return Ext.os.is.Phone || Ext.os.is.Tablet;
    }
});