Ext.define('Admin.view.mobile.profile.Profile',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Admin.view.mobile.profile.ProfileController'
    ],

    controller: 'mobile-profile-profile',

    tabBar: {
        layout: {
            pack : 'center',
            align: 'center'
        },
        docked: 'bottom',
        defaults: {
            iconAlign: 'top'
        }
    },
    defaults: {
        scrollable: true
    },

    minHeight: 140,

    items: [{
        title: 'Настройки',
        iconCls: 'x-fa fa-gear',
        items: [{
            xtype: 'formpanel',
            reference: 'setting',
            trackResetOnLoad: true,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'placeholder',
                autoComplete: false,
                clearIcon: false,
                allowBlank: false
            },
            //title: 'Настройки',
            items: [{
                name: 'email',
                label: 'Email',
                vtype: 'email'
            }, {
                name: 'address',
                label: 'IP Адрес',
                vtype: 'IPAddress',
                help: 'В целях безопасности, доступ к системе осуществляться исключительно с IP адреса привязанного к Вашему аккаунту.'
            }, {
                xtype: 'button',
                itemId: 'settingBtn',
                formBind: true,
                submitBtn: true,
                text: 'Сохранить',
                margin: '20 0 0 0'
            }]
        }]
    }, {
        title: 'Пароль',
        iconCls: 'x-fa fa-lock',
        items: [{
            xtype: 'formpanel',
            reference: 'password',
            defaults: {
                xtype: 'passwordfield',
                labelAlign: 'placeholder',
                autoComplete: false,
                allowBlank: false
            },
            items: [{
                name: 'password',
                initialPassword: true,
                label: 'Пароль'
            }, {
                name: 'confirm',
                label: 'Подтверждение',
                vtype: 'password'
            }, {
                xtype: 'button',
                itemId: 'passwordBtn',
                formBind: true,
                submitBtn: true,
                text: 'Сохранить',
                margin: '20 0 0 0'
            }]
        }]
    }]
});
