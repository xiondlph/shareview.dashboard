Ext.define('Admin.store.Navigation', {
    extend: 'Ext.data.TreeStore',

    storeId: 'Navigation',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [{
            text: 'Профиль',
            iconCls: 'x-fa fa-user',
            viewType: 'profile',
            leaf: true
        }, {
            text: 'Оплата',
            iconCls: 'x-fa fa-credit-card',
            viewType: 'payment',
            leaf: true
        }, {
            text: 'Профиль',
            iconCls: 'x-fa fa-user',
            viewType: 'profile',
            leaf: true
        }, {
            text: 'Оплата',
            iconCls: 'x-fa fa-credit-card',
            viewType: 'payment',
            leaf: true
        }, {
            text: 'Профиль',
            iconCls: 'x-fa fa-user',
            viewType: 'profile',
            leaf: true
        }, {
            text: 'Оплата',
            iconCls: 'x-fa fa-credit-card',
            viewType: 'payment',
            leaf: true
        }]
    }
});
