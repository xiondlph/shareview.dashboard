Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboard',

    boxReady: function (view) {
        var ref = this.getReferences();

        Ext.create('Ext.tip.ToolTip', {
            target: ref.addressField.getTrigger('hint').getEl(),
            html: 'В целях безопасности, доступ к API осуществляться исключительно с IP адреса привязанного к Вашему аккаунту.'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: ref.requestsField.getTrigger('payment').getEl(),
            html: 'Пополнить запросы'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: ref.requestsField.getTrigger('hint').getEl(),
            html: 'Количество доступных запросов к ресурсам API, для Вашего аккаутна.'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: ref.keyField.getTrigger('clipboard').getEl(),
            hideDelay: 500,
            id: 'clipboard',
            listeners: {
                beforeshow: function updateTip(tip) {
                    tip.update('Копировать в буфер.');
                }
            }
        });

        Ext.create('Ext.tip.ToolTip', {
            target: ref.keyField.getTrigger('hint').getEl(),
            html: [
                'Ключ используется для осуществлении доступа без привязки к IP.',
                'Для использования ключа,',
                'его следует передавать во всех запросах в HTTP-заголовке X-Ismax-key.',
                'При использовании ключа, проверка по IP не производиться.'
            ].join(' '),
            hideDelay: 500
        });
    },

    goPayment: function () {
        this.redirectTo('payment');
    },

    copyKey: function (field) {
        field.focus().selectText();
        try {
            var successful  = document.execCommand('copy'),
                tips        = Ext.getCmp('clipboard');

            if (successful) {
                tips.show(10, 10);
                tips.update('Скопировано!');
            }
        } catch (err) {
            console.info('Cope failed');
        }
    }
});
