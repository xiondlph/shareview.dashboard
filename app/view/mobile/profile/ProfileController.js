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
        var refs        = this.getReferences(),
            vm          = this.getViewModel(),
            profile     = vm.get('profile');

        this.callParent([ view ]);

        refs.setting.setRecord(profile);
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
        var form, btn;

        if( e.event.keyCode === 13) {
            form = field.up('formpanel');
            btn = form && form.query('[submitBtn]');

            btn && btn.length === 1 && !btn[0].getDisabled() && btn[0].fireEvent('tap');
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
        var vm      = this.getViewModel(),
            refs    = this.getReferences(),
            form    = refs.setting;

        form.submitExt({
            url: '/api/profile',
            method: 'PUT',
            //url: 'resources/data/authentication/login/success.json',
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
