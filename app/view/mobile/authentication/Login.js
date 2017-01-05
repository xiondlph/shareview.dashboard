Ext.define('Admin.view.mobile.authentication.Login',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Admin.view.mobile.authentication.LoginController',
        'Admin.view.mobile.authentication.LoginModel'
    ],

    controller: 'mobile-authentication-login',
    viewModel: {
        type: 'authentication-login'
    },

    padding: 0,

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        reference: 'adminMainBar',
        cls: 'admin-auth-bar',
        items: [{
            xtype: 'component',
            cls: 'admin-auth-logo',
            html: 'Shareview'
        }]
    }, {
        xtype: 'formpanel',
        reference: 'adminLoginForm',
        height: '100%',
        width: '100%',
        padding: 20,
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
