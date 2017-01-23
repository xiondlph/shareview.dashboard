Ext.define('Admin.override.form.Panel', {
    override: 'Ext.form.Panel',

    initialize : function() {
        this.callParent();
        this.on({
            validitychange: 'checkValidity',
            scope: this
        });

        this.onValidityChange(!this.hasInvalidField());
    },

    hasInvalidField: function() {
        var fields = this.getFieldsArray(),
            invalidField;

        invalidField = fields.filter(function (field) {
            return !field.isValid();
        });

        return !Ext.isEmpty(invalidField);
    },

    checkValidity: function() {
        var valid;

        if (this.destroyed) {
            return;
        }

        valid = !this.hasInvalidField();
        if (valid !== this.wasValid) {
            this.onValidityChange(valid);
            this.wasValid = valid;
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
        var boundItems = this._boundItems;

        if (!boundItems || boundItems.getCount() === 0) {
            boundItems = this._boundItems = new Ext.util.MixedCollection();
            boundItems.addAll(this.query('[formBind]'));
        }

        return boundItems;
    },

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

    setValues: function(values) {
        this.callParent([values]);

        this.onValidityChange(!this.hasInvalidField());

        return this;
    },

    isDirty: function () {
        var fields = this.getFieldsArray(),
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
            jsonData: options.data,
            scope: me
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
