Ext.define('Admin.override.form.Panel', {
    override: 'Ext.form.Panel',

    listeners: {
        validitychange: function () {
            this.onValidityChange();
        }
    },

    hasInvalidField: function() {
        var me          = this,
            hasInvalid  = false,
            fields      = me.getFields(),
            props;

        for (props in fields) {
            if (fields.hasOwnProperty(props) && !fields[props].isValid()) {
                hasInvalid = true;
            }
        }

        return hasInvalid;
    },

    onValidityChange: function () {
        console.log(this.hasInvalidField());
    },

    submitExt: function (options) {
        var me          = this,
            record      = me.getRecord(),
            validate    = record.validate();

        if (!record.dirty) {
            return;
        }

        options = Ext.apply({
            url : me.getUrl(),
            method: 'POST',
            data: record.getChanges(),
            waitMsg: 'Загрузка...',
            success: Ext.emptyFn
        }, options || {});

        if (validate.isValid()) {
            me.setMasked({
                xtype: 'loadmask',
                message: options.waitMsg
            });

            Ext.Ajax.request({
                url: options.url,
                method: options.method,
                jsonData: options.data
            }).then(function (response, opts) {
                var data = Ext.decode(response.responseText);
                me.setMasked(false);

                if (data.success) {
                    record.commit();
                }

                options.success(data);
            }, function (response, opts) {
                me.setMasked(false);
                // TODO: record.reject();
            });
        } else {
            validate.each(function (item) {
                me.down("field[name='"+item.field+"']").markInvalid(item.msg || item[0].msg);
            });
        }
    },

    // Ручное поднятие плейсхолдеров
    updatePlaceholderState: function () {
        var fields = this.getFields(),
            prop;

        for (prop in fields) {
            if (fields.hasOwnProperty(prop)) {
                fields[prop].commitValue();
            }
        }
    },

    setValues: function(values) {
        var fields = this.getFields(),
            prop;

        this.callParent(arguments);

        for (prop in fields) {
            if (fields.hasOwnProperty(prop)) {
                fields[prop].updatePlaceholderState();
            }
        }

        return this;
    }
});
