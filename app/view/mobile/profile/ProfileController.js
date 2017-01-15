Ext.define('Admin.view.mobile.profile.ProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobile-profile-profile',

    requires: [
        'Ext.Toast'
    ],

    control: {
        'textfield': {
            focus: 'onFieldFocus',
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

    onFieldFocus: function (field) {
        if (Ext.platformTags.desktop) {
            return;
        }

        var me = this;

        setTimeout(function () {
            me.fieldMoveTop(field);
        }, 700);
    },

    fieldKeyUp: function (field, e) {
        var btn;

        if( e.event.keyCode === 13) {
            btn = field.up('formpanel').down('button');

            !btn.getDisabled() && btn.fireEvent('tap');
        }
    },

    fieldMoveTop: function (field) {
        var scroller    = field.up('formpanel').up().getScrollable(),
            offset      = scroller.position.y + field.element.getY(),
            container   = Ext.Viewport.getActiveItem();

        if (container && container.element.getHeight() >= 200) {
            offset -= 60;
        }

        scroller.scrollTo(null, offset, true);
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
