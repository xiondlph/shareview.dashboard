Ext.define('Admin.override.form.Panel', {
    override: 'Ext.form.Panel',

    initialize : function() {
        var me = this;

        me.callParent();
        me.on({
            validitychange: 'checkValidity',
            scope: this
        });

        me.onValidityChange(!this.hasInvalidField());
    },

    hasInvalidField: function() {
        var me = this,
            fields = me.getFieldsArray(),
            invalidField;

        invalidField = fields.filter(function (field) {
            return !field.isValid();
        });

        return !Ext.isEmpty(invalidField);
    },

    checkValidity: function() {
        var me = this,
            valid;

        if (me.destroyed) {
            return;
        }

        valid = !me.hasInvalidField();
        if (valid !== me.wasValid) {
            me.onValidityChange(valid);
            me.wasValid = valid;
        }
    },

    onValidityChange: function (valid) {
        var boundItems = this.getBoundItems(),
            items, i, iLen, cmp;

        if (boundItems) {
            items = boundItems.items;
            iLen  = items.length;

            for (i = 0; i < iLen; i++) {
                cmp = items[i];

                if (!!cmp.getDisabled() === valid) {
                    cmp.setDisabled(!valid);
                }
            }
        }
    },

    getBoundItems: function() {
        var me = this,
            boundItems = me._boundItems;

        if (!boundItems || boundItems.getCount() === 0) {
            boundItems = me._boundItems = new Ext.util.MixedCollection();
            boundItems.addAll(me.query('[formBind]'));
        }

        return boundItems;
    },

    getChanges: function () {
        var me = this,
            fields = me.getFields(),
            changes = {}, props;

        for (props in fields) {
            if (fields.hasOwnProperty(props) && fields[props].isDirty()) {
                changes[props] = fields[props].getValue();
            }
        }

        return changes;
    },

    setValues: function(values) {
        this.callParent([values]);

        this.onValidityChange(!this.hasInvalidField());

        return this;
    },

    isDirty: function () {
        var me = this,
            fields = this.getFieldsArray(),
            dirtyFields;

        dirtyFields = fields.filter(function (field) {
            return field.isDirty();
        });

        return !Ext.isEmpty(dirtyFields);
    },

    submitExt: function (options) {
        var me = this;

        if (!me.isDirty()) {
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
