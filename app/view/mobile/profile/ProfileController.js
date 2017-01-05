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
            btn = field.up('formpanel').getComponent('loginbtn');

            !btn.getDisabled() && btn.fireEvent('tap');
        }
    },

    fieldMoveTop: function (field) {
        var scroller = field.up('formpanel').up().getScrollable(),
            offset = field.element.getY();

        if (offset > 10) {
            offset -= 10;
        }

        scroller.scrollTo(null, scroller.position.y + offset, true);
    }
});
