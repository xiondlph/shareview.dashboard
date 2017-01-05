
Ext.define('Admin.view.payment.Payment',{
    extend: 'Ext.Container',
    xtype: 'payment',

    requires: [
        'Admin.view.payment.PaymentController',
        'Admin.view.payment.PaymentModel'
    ],

    controller: 'payment-payment',
    viewModel: {
        type: 'payment-payment'
    },

    layout: 'float',
    padding: 10,
    defaults: {
        margin: 10,
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
        title: 'Настройки',
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
    }, {
        xtype: 'formpanel',
        title: 'Пароль',
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
});
