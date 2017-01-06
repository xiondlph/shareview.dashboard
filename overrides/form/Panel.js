Ext.define('Admin.override.form.Panel', {
    override: 'Ext.form.Panel',

    loadRecord: function (record) {
        if (!record || !record.data) {
            return;
        }

        var me      = this,
            fields   = me.getFields(),
            prop;

        me.setRecord(record);
        for (prop in fields) {
            if (fields.hasOwnProperty(prop)) {
                //fields[prop].setValue(record.get(prop));
                fields[prop].animatePlaceholderToLabel();
            }
        }
    },

    getDirtyValues: function () {
        var me = this,
            rec = me.getRecord();

        rec.reject(true);
        rec.set(me.getValues());

        return rec.getChanges();
    }
});