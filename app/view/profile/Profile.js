
Ext.define('Admin.view.profile.Profile',{
    extend: 'Ext.tab.Panel',
    xtype: 'profile',

    requires: [
        'Admin.view.profile.ProfileController',
        'Admin.view.profile.ProfileModel'
    ],

    controller: 'profile-profile',
    viewModel: {
        type: 'profile-profile'
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

    items: [{
        title: 'Настройки',
        iconCls: 'x-fa fa-gear',
        items: [{
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'textfield',
                    label: 'Title',
                    labelAlign: 'placeholder'
                },
                {
                    xtype: 'textfield',
                    label: 'Price',
                    labelAlign: 'placeholder'
                }
            ]
        }]
    }, {
        title: 'Пароль',
        iconCls: 'x-fa fa-gear',
        items: [{
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'textfield',
                    label: 'Пароль',
                    labelAlign: 'placeholder'
                },
                {
                    xtype: 'textfield',
                    label: 'Подтверждение',
                    labelAlign: 'placeholder'
                }
            ]
        }]
    }]
});
