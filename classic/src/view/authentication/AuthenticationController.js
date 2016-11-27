Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    requires: [
        'Ext.window.Toast'
    ],

    onLoginButton: function() {
        var me = this,
            ref = me.getReferences();

        ref.login.setLoading('Авторизация...');
        Ext.Ajax.request({
            url: '/user/signin',
            method: 'post',
            params: ref.login.getValues()
        }).then(function (response, opts) {
            ref.login.setLoading(false);
            var data = Ext.decode(response.responseText);

            if (data.success) {
                me.redirectTo('dashboard', true);
            } else {
                ref.emailField.markInvalid('Неверные логин/пароль');
                Ext.toast({
                    html: 'Неверные логин/пароль',
                    align: 'br'
                });
            }
        }, function (response, opts) {
            ref.login.setLoading(false);
        });
    }
});
