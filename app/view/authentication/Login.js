Ext.define('Admin.view.authentication.Login',{
    extend: 'Ext.Container',
    xtype: 'login',

    requires: [
        'Ext.plugin.Responsive',
        'Admin.view.authentication.LoginController'
    ],

    controller: 'authentication-login',

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    cls: 'admin-auth',
    fullscreen: true,
    scrollable: {
        direction: 'vertical'
    },
    items: [{
        padding: '0 0 10 0',
        html: 'Вход в личный кабинет'
    }, {
        xtype: 'formpanel',
        reference: 'adminLoginForm',
        height: 'auto',
        width: 500,
        padding: 30,
        shadow: true,
        defaults: {
            xtype: 'textfield',
            labelAlign: 'placeholder',
            clearIcon: false,
            autoComplete: false,
            allowBlank: false
        },
        items: [{
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

