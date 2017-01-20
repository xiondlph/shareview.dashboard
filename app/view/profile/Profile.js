
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

    listeners: {
        painted: 'onProfilePainted'
    },

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
        bind: {
            record: '{setting}'
        },
        //title: 'Настройки',
        items: [{
            xtype: 'textfield',
            name: 'email',
            label: 'Email',
            clearIcon: false,
            labelAlign: 'placeholder',
            //bind: '{setting.email}'
        }, {
            xtype: 'textfield',
            name: 'address',
            label: 'IP адрес',
            clearIcon: false,
            labelAlign: 'placeholder',
            vtype: 'email',
            //bind: '{setting.address}',
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
