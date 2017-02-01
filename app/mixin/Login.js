Ext.define('Admin.mixin.Login', {
    extend: 'Ext.Mixin',

    onLoginButton: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.adminLoginForm;

        form.submitExt({
            url: '/user/signin',
            //url: 'resources/data/authentication/login/success.json',
            waitMsg: 'Авторизация...',
            success: function (data) {
                if (data.success) {
                    me.getView().fireEvent('auth', data);
                } else {
                    Admin.Msg.alert('Ошибка', 'Неверные E-mail или пароль');
                }
            }
        });
    },

    fieldKeyUp: function (field, e) {
        var form, btn;

        if( e.event.keyCode === 13) {
            form = field.up('formpanel');
            btn = form && form.query('[submitBtn]');

            btn && btn.length === 1 && !btn[0].getDisabled() && btn[0].fireEvent('tap');
        }
    }
});
