Ext.define('Admin.override.form.Panel', {
    override: 'Ext.form.Panel',

    getChanges: function () {
        var fields = this.getFields(),
            changes = {}, props;

        for (props in fields) {
            if (fields.hasOwnProperty(props) && fields[props].isDirty()) {
                changes[props] = fields[props].getValue();
            }
        }

        return changes;
    },

    isDirty: function () {
        var fields = this.getFieldsArray(),
            dirtyFields;

        dirtyFields = fields.filter(function (field) {
            return field.isDirty();
        });

        return !Ext.isEmpty(dirtyFields);
    },

    validate: function () {
        var fields = this.getFieldsArray(),
            invalidFields;

        invalidFields = fields.filter(function (field) {
            return !field.validate();
        });

        return Ext.isEmpty(invalidFields);
    },

    submitExt: function (options) {
        var me = this;

        if (!me.isDirty() || !me.validate()) {
            return;
        }

        options = Ext.apply({
            url : me.getUrl(),
            method: 'POST',
            data: me.getChanges(),
            waitMsg: 'Загрузка...',
            success: Ext.emptyFn
        }, options || {});

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
                me.setValues(me.getChanges());
            }

            options.success(data);
        }, function (response, opts) {
            me.setMasked(false);
        });
    }
});
