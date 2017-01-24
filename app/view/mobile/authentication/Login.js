Ext.define('Admin.view.mobile.authentication.Login',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Admin.view.mobile.authentication.LoginController',
    ],

    controller: 'mobile-authentication-login',

    cls: 'admin-auth',
    fullscreen: true,
    padding: 0,
    scrollable: {
        direction: 'vertical'
    },

    items: [{
        xtype: 'formpanel',
        reference: 'adminLoginForm',
        padding: 10,
        defaults: {
            xtype: 'textfield',
            labelAlign: 'placeholder',
            clearIcon: false,
            autoComplete: false,
            allowBlank: false
        },
        items: [{
            xtype: 'label',
            padding: '0 0 10 0',
            html: 'Вход в личный кабинет'
        }, {
            name: 'email',
            label: 'E-Mail',
            vtype: 'email',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph auth-email'
                }
            }
        }, {
            xtype: 'passwordfield',
            name: 'password',
            label: 'Пароль',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph auth-password'
                }
            }
        }, {
            xtype: 'button',
            itemId: 'loginbtn',
            formBind: true,
            submitBtn: true,
            text: 'Вход',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            ui: 'confirm',
            margin: '30 0 0 0'
        }]
    }]
});
