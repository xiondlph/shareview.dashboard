
Ext.define('Admin.view.profile.Profile',{
    extend: 'Ext.Container',
    xtype: 'profile',

    requires: [
        'Ext.layout.Float',
        'Admin.view.profile.ProfileController',
        'Admin.view.profile.ProfileModel'
    ],

    controller: 'profile-profile',
    viewModel: {
        type: 'profile-profile'
    },

    layout: 'float',
    padding: 10,
    defaults: {
        margin: 10,
        padding: 30,
        //shadow: true,
        plugins: 'responsive',
        responsiveConfig: {
            'width <= 800': {
                width: 'calc(100% - 20px)'
            },

            'width > 800': {
                width: 'calc(50% - 20px)'
            }
        }
    },

    items: [{
        xtype: 'formpanel',
        reference: 'setting',
        //title: 'Настройки',
        items: [{
            xtype: 'textfield',
            label: 'Email',
            name: 'email',
            clearIcon: false,
            labelAlign: 'placeholder'
        }, {
            xtype: 'textfield',
            label: 'IP адрес',
            name: 'address',
            clearIcon: false,
            labelAlign: 'placeholder'
        }, {
            xtype: 'button',
            itemId: 'settingBtn',
            text: 'Сохранить',
            margin: '20 0 0 0'
        }]
    }, {
        xtype: 'formpanel',
        reference: 'password',
        //title: 'Смена пароля',
        items: [{
            xtype: 'passwordfield',
            name: 'password',
            label: 'Новый пароль',
            labelAlign: 'placeholder'
        }, {
            xtype: 'passwordfield',
            name: 'confirm',
            label: 'Подтверждение',
            labelAlign: 'placeholder'
        }, {
            xtype: 'button',
            itemId: 'passwordBtn',
            text: 'Сохранить',
            margin: '20 0 0 0'
        }]
    }]
});
