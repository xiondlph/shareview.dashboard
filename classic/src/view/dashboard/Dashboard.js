Ext.apply(Ext.form.field.VTypes, {
    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = field.up().getComponent(field.initialPassField).getValue();
            return (val === pwd);
        }
        return true;
    },
    passwordText: 'Пароли не совпадают'
});

Ext.define('Admin.view.dashboard.Dashboard',{
    extend: 'Ext.container.Container',
    xtype: 'admindashboard',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Admin.view.dashboard.DashboardController',
        'Admin.view.dashboard.DashboardModel'
    ],

    controller: 'dashboard-dashboard',
    viewModel: {
        type: 'dashboard-dashboard'
    },

    layout: "responsivecolumn",

    items: [{
        xtype: 'admin.form',
        title: 'Настройки',
        reference: 'setting',
        items: [{
            blankText: 'Следует указать Email',
            fieldLabel: 'Email',
            name: 'email',
            vtype: 'email',
            bind: {
                value: '{profile.email}'
            }
        }, {
            blankText: 'Необходимо привязать IP адрес',
            fieldLabel: 'IP адрес',
            reference: 'addressField',
            name: 'address',
            bind: {
                value: '{profile.address}'
            },
            triggers: {
                hint: {
                    cls: 'trigger-question'
                }
            }
        }],
        buttons: [{
            text: 'Сохранить',
            formBind: true,
            listeners: {
                click: 'saveSettings'
            }
        }]
    }, {
        xtype: 'admin.form',
        title: 'Смена пароля',
        defaults: {
            submitEmptyText: false,
            validateOnBlur: false,
            inputType: 'password',
            labelWidth: 120,
            allowBlank: false,
            msgTarget: 'side',
            anchor: '100%'
        },
        items: [{
            blankText: 'Следует указать новый пароль',
            fieldLabel: 'Новый пароль',
            itemId: 'password',
            name: 'password'
        }, {
            blankText: 'Необходимо подтвердить новый пароль',
            initialPassField: 'password',
            fieldLabel: 'Подтверждение',
            name: 'confirm',
            vtype: 'password'
        }],
        buttons: [{
            text: 'Сохранить',
            formBind: true,
            listeners: {
                click: 'savePassword'
            }
        }]
    }, {
        xtype: 'admin.form',
        title: 'Информация',
        reference: 'info',
        defaults: {
            labelWidth: 120,
            editable: false,
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Запросов',
            dataIndex: 'requests',
            reference: 'requestsField',
            bind: {
                value: '{profile.requests}'
            },
            triggers: {
                payment: {
                    cls: 'trigger-payment',
                    hideOnReadOnly: false,
                    handler: 'goPayment'
                },
                hint: {
                    cls: 'trigger-question',
                    hideOnReadOnly: false
                }
            }
        }, {
            fieldLabel: 'Ключ',
            dataIndex: 'key',
            reference: 'keyField',
            bind: {
                value: '{profile.key}'
            },
            triggers: {
                clipboard: {
                    cls: 'trigger-clipboard',
                    hideOnReadOnly: false,
                    handler: 'copyKey'
                },
                hint: {
                    cls: 'trigger-question',
                    hideOnReadOnly: false
                }
            }
        }]
    }]
});
