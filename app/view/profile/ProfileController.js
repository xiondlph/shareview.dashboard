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

        vm.setLinks({
            setting: {
                reference: 'Admin.Model.Profile',
                create: profile.getData()
            }
        });

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
            btn = field.up('formpanel').getComponent('loginbtn');

            !btn.getDisabled() && btn.fireEvent('tap');
        }
    },

    onSettingButton: function (btn) {
        var me      = this,
            vm      = me.getViewModel(),
            refs    = me.getReferences(),
            form    = refs.setting,
            record  = vm.get('setting'),
            validate,
            changes;

        if (!record.dirty) {
            return;
        }

        validate = record.validate();

        if (validate.isValid()) {
            form.setMasked({
                xtype: 'loadmask',
                message: 'Сохранение...'
            });

            Ext.Ajax.request({
                //url: '/api/profile',
                url: 'resources/data/authentication/login/success.json',
                method: 'post',
                jsonData: record.getChanges()
            }).then(function (response, opts) {
                var data = Ext.decode(response.responseText);
                form.setMasked(false);

                if (data.success) {
                    vm.get('profile').set(record.getChanges());
                    record.commit();
                } else {
                    Admin.Overlay();
                }
            }, function (response, opts) {
                form.setMasked(false);
            });
        } else {
            validate.each(function (item) {
                form.down("field[name='"+item.field+"']").markInvalid(item.msg || item[0].msg);
            });
        }

    },

    onPasswordButton: function (btn) {
        var me      = this,
            refs    = me.getReferences();
    }
});
