Ext.define('Admin.view.authentication.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication-login',

    onLoginButton: function () {
        var me = this,
            refs = me.getReferences(),
            view = me.getView(),
            vm = me.getViewModel(),
            credentials = vm.get('credentials'),
            validate = credentials.validate(),
            action;

        if (validate.isValid()) {
            Ext.Viewport.remove(view);
            Ext.Viewport.add({
                xtype: 'admin.dashboard'
            });
        } else {
            refs.login.submit({
                params: "",
                jsonData: Ext.util.JSON.encode(refs.login.getValues()),
                //waitTitle:'Авторизация...',
                waitMsg:'Авторизация...'
            });
            // Ext.toast('Неверный формат E-Mail', 500);
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
