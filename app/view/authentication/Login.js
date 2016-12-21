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

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        reference: 'adminMainBar',
        cls: 'admin-auth-bar',
        items: [{
            xtype: 'component',
            cls: 'admin-logo',
            html: 'Shareview'
        }]
    }, {
        xtype: 'formpanel',
        reference: 'adminLoginForm',
        height: '100%',
        width: '100%',
        padding: 30,
        plugins: 'responsive',
        responsiveConfig: {
            'desktop': {
                shadow: true,
                height: 'auto',
                width: 500
            }
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
                disabled: '{!isFilled}'
            }
        }]
    }],
    listeners: {
        resize: 'onContainerResize'
    }
});
