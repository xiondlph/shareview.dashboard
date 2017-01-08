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
            profile     = vm.get('profile'),
            fields      = refs.setting.getFields(),
            prop;

        me.callParent([ view ]);

        // vm.setLinks({
        //     setting: {
        //         reference: 'Admin.Model.Profile',
        //         create: profile.getData()
        //     }
        // });

        // Ручное поднятие плейсхолдеров
        for (prop in fields) {
            if (fields.hasOwnProperty(prop)) {
                fields[prop].animatePlaceholderToLabel();
            }
        }
    },

    fieldKeyUp: function (field, e) {
        var btn;

        if( e.event.keyCode === 13) {
            btn = field.up('formpanel').down('button');

            !btn.getDisabled() && btn.fireEvent('tap');
        }
    },

    onSettingButton: function (btn) {
        var me      = this,
            vm      = me.getViewModel(),
            refs    = me.getReferences(),
            form    = refs.setting;

        form.submitExt({
            url: '/api/profile',
            //url: 'resources/data/authentication/login/success.json',
            waitMsg: 'Сохранение...',
            success: function (data) {
                if (data.success) {
                    vm.get('profile').set(form.getValues());
                } else {
                    Admin.Overlay();
                }
            }
        });
    },

    onPasswordButton: function (btn) {
        var me      = this,
            refs    = me.getReferences();
    }
});
