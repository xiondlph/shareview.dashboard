Ext.define('Admin.view.authentication.Login',{
    extend: 'Ext.Container',
    xtype: 'login',

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
        bind: {
            record: '{auth}'
        },
        shadow: true,
        items: [{
            xtype: 'textfield',
            name: 'email',
            label: 'E-Mail',
            labelAlign: 'placeholder',
            clearIcon: false,
            autoComplete: false,
            bind: '{auth.email}',
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
