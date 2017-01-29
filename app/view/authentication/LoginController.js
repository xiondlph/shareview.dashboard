Ext.define('Admin.view.authentication.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication-login',

    requires: [
        'Admin.mixin.Login'
    ],

    mixins: [
        'Admin.mixin.Login'
    ],

    control: {
        'textfield': {
            keyup: 'fieldKeyUp'
        },

        '#loginbtn': {
            tap: 'onLoginButton'
        }
    }
});
