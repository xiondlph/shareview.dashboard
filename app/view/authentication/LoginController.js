Ext.define('Admin.view.authentication.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication-login',

    onLoginButton: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            credentials = vm.get('credentials'),
            validate = credentials.validate(),
            action;
        debugger;
        if (validate.isValid()) {
            Ext.Viewport.remove(view);
            Ext.Viewport.add({
                xtype: 'admin.dashboard'
            });
        } else {
            Ext.toast('Неверный формат E-Mail', 500);
            // action = Ext.create('Ext.ActionSheet', {
            //     items: [{
            //         xtype: 'label',
            //         html: 'Error'
            //     }, {
            //         text: 'OK',
            //         scope: this,
            //         handler: function() {
            //             action.hide();
            //         }
            //     }]
            // });
            //
            // Ext.Viewport.add(action);
            // action.show();
        }
    }
});
