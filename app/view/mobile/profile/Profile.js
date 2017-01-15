Ext.define('Admin.view.mobile.profile.Profile',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Admin.view.mobile.profile.ProfileController',
        'Admin.view.mobile.profile.ProfileModel'
    ],

    controller: 'mobile-profile-profile',
    viewModel: {
        type: 'mobile-profile-profile'
    },

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
            bind: {
                record: '{setting}'
            },
            defaults: {
                labelAlign: 'placeholder',
                autoComplete: false,
                clearIcon: false
            },
            //title: 'Настройки',
            items: [{
                xtype: 'textfield',
                name: 'email',
                label: 'Email',
                bind: '{setting.email}'
            }, {
                xtype: 'textfield',
                name: 'address',
                label: 'IP Адрес',
                bind: '{setting.address}',
                help: 'В целях безопасности, доступ к системе осуществляться исключительно с IP адреса привязанного к Вашему аккаунту.'
            }, {
                xtype: 'button',
                itemId: 'settingBtn',
                text: 'Сохранить',
                margin: '20 0 0 0',
                bind: {
                    disabled: '{!isFilled}'
                }
            }]
        }]
    }, {
        title: 'Пароль',
        iconCls: 'x-fa fa-lock',
        items: [{
            xtype: 'formpanel',
            reference: 'password',
            items: [{
                xtype: 'passwordfield',
                name: 'password',
                labelAlign: 'placeholder',
                label: 'Пароль'
            }, {
                xtype: 'passwordfield',
                name: 'confirm',
                labelAlign: 'placeholder',
                label: 'Подтверждение'
            }, {
                xtype: 'button',
                itemId: 'passwordBtn',
                text: 'Сохранить',
                margin: '20 0 0 0'
            }]
        }]
    }]
});
