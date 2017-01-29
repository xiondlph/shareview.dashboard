Ext.define('Admin.view.mobile.authentication.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobile-authentication-login',

    requires: [
        'Admin.mixin.Login'
    ],

    mixins: [
        'Admin.mixin.Login'
    ],

    control: {
        'textfield': {
            focus: 'onFieldFocus',
            keyup: 'fieldKeyUp'
        },

        '#loginbtn': {
            tap: 'onLoginButton'
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

    fieldMoveTop: function (field) {
        var scroller = this.getView().getScrollable(),
            offset = scroller.position.y + field.element.getY();

        scroller.scrollTo(null,  offset, true);
    }
});
