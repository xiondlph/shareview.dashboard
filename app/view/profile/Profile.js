
Ext.define('Admin.view.profile.Profile',{
    extend: 'Ext.Container',
    xtype: 'profile',

    requires: [
        'Ext.layout.Float',
        'Admin.view.profile.ProfileController'
    ],

    controller: 'profile-profile',

    baseCls: 'admin-dashboard-card-item',
    padding: 10,
    defaults: {
        margin: 10,
        padding: 10,
        cls: 'admin-dashboard-form',
        plugins: 'responsive',
        responsiveConfig: {
            'width <= 800': {
                userCls: 'big'
            },

            'width > 800': {
                userCls: 'small'
            }
        }
    },

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
        // title: 'Настройки',
        items: [{
            name: 'email',
            label: 'Email',
            vtype: 'email'
        }, {
            name: 'address',
            label: 'IP адрес',
            vtype: 'IPAddress',
            help: 'В целях безопасности, доступ к системе осуществляться исключительно с IP адреса привязанного к Вашему аккаунту.'
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items: [{
                xtype: 'button',
                itemId: 'settingBtn',
                submitBtn: true,
                text: 'Сохранить',
                margin: '20 0 0 0'
            }]
        }]
    }, {
        xtype: 'formpanel',
        allowBlank: false,
        reference: 'password',
        defaults: {
            xtype: 'passwordfield',
            labelAlign: 'placeholder',
            autoComplete: false,
            allowBlank: false
        },
        // title: 'Смена пароля',
        items: [{
            name: 'password',
            initialPassword: true,
            label: 'Новый пароль'
        }, {
            name: 'confirm',
            label: 'Подтверждение',
            vtype: 'password'
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items: [{
                xtype: 'button',
                itemId: 'passwordBtn',
                submitBtn: true,
                text: 'Сохранить',
                margin: '20 0 0 0'
            }]
        }]
    }]
});
