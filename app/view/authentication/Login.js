
Ext.define('Admin.view.authentication.Login',{
    extend: 'Ext.Container',

    requires: [
        'Admin.Model.Login',
        'Admin.view.authentication.LoginController',
        'Admin.view.authentication.LoginModel'
    ],

    controller: 'authentication-login',
    viewModel: {
        type: 'authentication-login'
    },

    fullscreen: true,
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'component',
            html: 'Shareview'
        }]
    }, {
        xtype: 'formpanel',
        plugins: 'responsive',
        responsiveConfig: {
            'width < 500': {
                shadow: false,
                width: '100%',
                height: '100%'
            },

            'width >= 500': {
                padding: 30,
                shadow: true,
                width: 500,
                height: 'auto'
            }
        },
        items: [{
            padding: '0 0 10 0',
            html: 'Вход в личный кабинет'
        }, {
            xtype: 'textfield',
            name: 'email',
            allowBlank : false,
            label: 'E-Mail',
            labelAlign: 'placeholder',
            bind: '{credentials.email}',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph-noop auth-email-trigger'
                }
            }
        }, {
            xtype: 'passwordfield',
            name: 'password',
            allowBlank : false,
            label: 'Пароль',
            labelAlign: 'placeholder',
            bind: '{credentials.password}',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph-noop auth-password-trigger'
                }
            }
        }, {
            xtype: 'button',
            text: 'Вход',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            margin: '30 0 0 0',
            listeners: {
                tap: 'onLoginButton'
            },
            bind: {
                disabled: '{!isCredentialsOk}'
            }
        }]
    }]
});
