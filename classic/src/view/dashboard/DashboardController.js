Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboard',

    boxReady: function (view) {
        var ref         = this.getReferences(),
            setting     = ref.setting,
            info        = ref.info,
            vm          = this.getViewModel(),
            profile     = vm.get('profile');

        vm.bind('{profile}', this.onProfileLoad, this, {deep: true});

        if (!profile) {
            setting.setLoading('Загрузка');
            info.setLoading('Загрузка');
        }

        this.setToolTip();
    },

    onProfileLoad: function (rec) {
        var ref         = this.getReferences(),
            setting     = ref.setting;
            info        = ref.info;

        setting.loadRecord(rec);
        setting.setLoading(false);
        info.setLoading(false);
    },

    onSaveSettings: function (btn) {
        var ref         = this.getReferences(),
            form        = ref.setting,
            record      = form.getRecord(),
            fieldParams = form.getValues(false, true);

        if (!form.isDirty()) {
            return;
        }

        form.submit({
            getParams: function () {
                return Ext.apply({}, fieldParams);
            },
            success: function (form, action) {
                record.set(fieldParams);
                record.commit();
                Ext.toast({
                    html: 'Новые настройки сохранены',
                    closeToolText: 'Закрыть',
                    iconCls: 'x-fa fa-comments',
                    align: 'br',
                    closable: true
                });
            },
            failure: function(form, action) {
                if (action.result.exist) {
                    ref.emailField.markInvalid('Пользователь с таким Email уже существует');
                }
            },
            waitMsg: 'Сохранение'
        });
    },

    setToolTip: function () {
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
            console.info('Copy failed');
        }
    }
});
