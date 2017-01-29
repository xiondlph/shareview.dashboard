Ext.define('Admin.mixin.Profile', {
    extend: 'Ext.Mixin',

    fieldKeyUp: function (field, e) {
        var form, btn;

        if( e.event.keyCode === 13) {
            form = field.up('formpanel');
            btn = form && form.query('[submitBtn]');

            btn && btn.length === 1 && !btn[0].getDisabled() && btn[0].fireEvent('tap');
        }
    },

    onSettingButton: function (btn) {
        var vm      = this.getViewModel(),
            refs    = this.getReferences(),
            form    = refs.setting;

        form.submitExt({
            url: '/api/profile',
            //url: 'resources/data/authentication/login/success.json',
            method: 'PUT',
            waitMsg: 'Сохранение...',
            success: function (data) {
                if (data.success) {
                    vm.get('profile').set(form.getValues());
                } else if (data.exist) {
                    Admin.Overlay.error('Этот Email уже используется!');
                } else {
                    Admin.Overlay.error();
                }
            }
        });
    },

    onPasswordButton: function (btn) {
        var vm      = this.getViewModel(),
            refs    = this.getReferences(),
            form    = refs.password;

        form.submitExt({
            url: '/api/password',
            //url: 'resources/data/authentication/login/success.json',
            method: 'POST',
            waitMsg: 'Сохранение...',
            success: function (data) {
                if (data.success) {
                    form.setValues({
                        password: null,
                        confirm: null
                    });
                } else {
                    Admin.Overlay.error();
                }
            }
        });
    }
});
