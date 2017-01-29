Ext.define('Admin.view.profile.ProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-profile',

    requires: [
        'Admin.mixin.Profile'
    ],

    mixins: [
        'Admin.mixin.Profile'
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
        var refs        = this.getReferences(),
            vm          = this.getViewModel(),
            profile     = vm.get('profile');

        this.callParent([ view ]);

        refs.setting.setRecord(profile);
    }
});
