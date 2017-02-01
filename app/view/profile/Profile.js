
Ext.define('Admin.view.profile.Profile',{
    extend: 'Ext.Container',
    xtype: 'profile',

    requires: [
        'Ext.layout.Float',
        'Admin.ux.form.Panel',
        'Admin.view.profile.ProfileController'
    ],

    controller: 'profile-profile',

    baseCls: 'admin-dashboard-card-item',
    padding: 10,
    defaults: {
        padding: 10,
        responsive: true,
        responsiveConfig: {
            'width <= 800': {
                userCls: 'big',
                margin: 10
            },

            'width > 800': {
                userCls: 'small',
                margin: 20
            }
        }
    },

    items: [{
        xtype: 'admin.formpanel',
        reference: 'setting',
        trackResetOnLoad: true,
        defaults: {
            xtype: 'textfield',
            labelAlign: 'placeholder',
            autoComplete: false,
            clearIcon: false,
            allowBlank: false
        },
        title: 'Настройки',
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
        xtype: 'admin.formpanel',
        reference: 'password',
        trackResetOnLoad: true,
        allowBlank: false,
        defaults: {
            xtype: 'passwordfield',
            labelAlign: 'placeholder',
            autoComplete: false,
            allowBlank: false
        },
        title: 'Смена пароля',
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
