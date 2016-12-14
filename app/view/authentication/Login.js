
Ext.define('Admin.view.authentication.Login',{
    extend: 'Ext.Container',

    requires: [
        'Ext.plugin.Responsive',
        'Admin.Model.Auth',
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
        reference: 'login',
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
            itemId: 'email',
            name: 'email',
            allowBlank : false,
            label: 'E-Mail',
            labelAlign: 'placeholder',
            bind: '{auth.email}',
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
            bind: '{auth.password}',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph-noop auth-password-trigger'
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
                disabled: '{!isFilled}'
            }
        }]
    }]
});
