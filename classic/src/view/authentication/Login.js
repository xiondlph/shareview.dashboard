Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.ux.window.LockingWindow',
    xtype: 'login',

    requires: [
        'Ext.plugin.Responsive',
        'Ext.form.Label'
    ],

    title: 'Вход в панель управления',

    controller: 'authentication',
    cls: 'auth-locked-window',

    items: [
        {
            xtype: 'form',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 800': {
                    width: '100%'
                },

                'width >= 415': {
                    width: 415
                }
            },
            reference: 'login',
            header: false,
            bodyPadding: '20 20',
            cls: 'auth-form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'label',
                    text: 'Авторизация'
                },
                {
                    xtype: 'textfield',
                    reference: 'emailField',
                    name: 'email',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'E-Mail',
                    vtype: 'email',
                    blankText: 'Следует указать Email',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    height: 55,
                    hideLabel: true,
                    emptyText: 'Пароль',
                    inputType: 'password',
                    name: 'password',
                    allowBlank : false,
                    blankText: 'Следует указать пароль',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                            xtype: 'box',
                            html: '<a href="#passwordreset" class="link-forgot-password">Забыли пароль?</a>'
                    }]
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Вход',
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                }
            ]
        }
    ]
});
