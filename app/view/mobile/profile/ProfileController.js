Ext.define('Admin.view.mobile.profile.ProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobile-profile-profile',

    requires: [
        'Admin.mixin.Profile'
    ],

    mixins: [
        'Admin.mixin.Profile'
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

    fieldMoveTop: function (field) {
        var scroller    = field.up('formpanel').up().getScrollable(),
            offset      = scroller.position.y + field.element.getY(),
            container   = Ext.Viewport.getActiveItem();

        if (container && container.element.getHeight() >= 200) {
            offset -= 60;
        }

        scroller.scrollTo(null, offset, true);
    }
});
