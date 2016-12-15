Ext.define('Admin.view.authentication.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication-login',

    requires: [
        'Ext.Toast'
    ],

    control: {
        'textfield': {
            keyup: 'fieldKeyUp'
        },

        '#loginbtn': {
            tap: 'onLoginButton'
        }
    },

    onLoginButton: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.login,
            vm = me.getViewModel(),
            auth = vm.get('auth'),
            validate = auth.validate(),
            firstErrField;

        if (validate.isValid()) {
            form.setMasked({
                xtype: 'loadmask',
                message: 'Авторизация...'
            });

            Ext.Ajax.request({
                url: 'resources/data/authentication/login/success.json', //'/user/signin',
                method: 'post',
                jsonData: form.getValues()
            }).then(function (response, opts) {
                var data = Ext.decode(response.responseText);
                form.setMasked(false);

                if (data.success) {
                    me.getView().fireEvent('auth', data);
                } else {
                    Admin.Overlay('Неверные E-mail или пароль');
                }
            }, function (response, opts) {
                form.setMasked(false);
            });
        } else {
            firstErrField = validate.first();

            Ext.toast(firstErrField.msg || firstErrField[0].msg, 3000);
        }
    },

    fieldKeyUp: function (field, e) {
        var btn;

        if( e.event.keyCode === 13) {
            btn = field.up('formpanel').getComponent('loginbtn');

            !btn.getDisabled() && btn.fireEvent('tap');
        }
    }
});
