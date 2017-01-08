Ext.define('Admin.view.mobile.authentication.Login',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Admin.view.mobile.authentication.LoginController',
        'Admin.view.authentication.LoginModel'
    ],

    controller: 'mobile-authentication-login',
    viewModel: {
        type: 'authentication-login'
    },

    cls: 'admin-auth',
    fullscreen: true,
    scrollable: {
        direction: 'vertical'
    },

    items: [{
        xtype: 'formpanel',
        reference: 'adminLoginForm',
        padding: 10,
        bind: {
            record: '{auth}'
        },
        items: [{
            padding: '0 0 10 0',
            html: 'Вход в личный кабинет'
        }, {
            xtype: 'textfield',
            name: 'email',
            label: 'E-Mail',
            labelAlign: 'placeholder',
            clearIcon: false,
            autoComplete: false,
            bind: '{auth.email}',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph auth-email'
                }
            }
        }, {
            xtype: 'passwordfield',
            name: 'password',
            label: 'Пароль',
            labelAlign: 'placeholder',
            clearIcon: false,
            bind: '{auth.password}',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph auth-password'
                }
            }
        }, {
            xtype: 'button',
            itemId: 'loginbtn',
            text: 'Вход',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            ui: 'confirm',
            margin: '30 0 0 0',
            bind: {
                disabled: '{!isLoginFormFilled}'
            }
        }]
    }]
});
