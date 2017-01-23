Ext.define('Admin.view.profile.ProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-profile',

    requires: [
        'Ext.Toast'
    ],

    control: {
        'textfield': {
            keyup: 'fieldKeyUp'
        },

        '#settingBtn': {
            tap: 'onSettingButton'
        },

        '#passwordBtn': {
            tap: 'onPasswordButton'
        }
    },

    init: function (view) {
        var me          = this,
            refs        = me.getReferences(),
            vm          = me.getViewModel(),
            profile     = vm.get('profile');

        me.callParent([ view ]);

        refs.setting.setRecord(profile);
    },

    fieldKeyUp: function (field, e) {
        var form, btn;

        if( e.event.keyCode === 13) {
            form = field.up('formpanel');
            btn = form && form.query('[submitBtn]');

            btn && !btn.getDisabled() && btn.fireEvent('tap');
        }
    },

    onSettingButton: function (btn) {
        var me      = this,
            vm      = me.getViewModel(),
            refs    = me.getReferences(),
            form    = refs.setting;

        form.submitExt({
            url: '/api/profile',
            method: 'PUT',
            //url: 'resources/data/authentication/login/success.json',
            waitMsg: 'Сохранение...',
            success: function (data) {
                if (data.success) {
                    vm.get('profile').set(form.getValues());
                } else {
                    Admin.Overlay.error();
                }
            }
        });
    },

    onPasswordButton: function (btn) {
        var me      = this,
            refs    = me.getReferences();
    }
});
