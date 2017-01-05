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
