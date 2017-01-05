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
        var btn;

        if( e.event.keyCode === 13) {
            btn = field.up('formpanel').getComponent('loginbtn');

            !btn.getDisabled() && btn.fireEvent('tap');
        }
    },

    onSettingButton: function (btn) {
        var me      = this,
            refs    = me.getReferences();

        console.log(refs.setting.getValues());
    },

    onPasswordButton: function (btn) {
        var me      = this,
            refs    = me.getReferences();

        console.log(refs.password.getValues());
    }
});
