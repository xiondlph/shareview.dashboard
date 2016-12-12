Ext.define('Admin.controller.Main', {
    extend: 'Ext.app.Controller',

    onLaunch: function () {
        var Login = Ext.create('Admin.view.authentication.Login', {
            shu: 'shu'
        });
        Ext.Viewport.add(Login);
        // Ext.Viewport.add({
        //     xtype: 'admin.dashboard'
        // });
    }
});
