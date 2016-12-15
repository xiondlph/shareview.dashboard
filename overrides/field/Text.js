Ext.define('Admin.override.field.Text', {
    override :'Ext.field.Text',

    listeners: {
        change: function () {
            this.unMarkInvalid();
        }
    },

    config: {
        triggers: {
            invalid: {
                cls: 'trigger-glyph auth-email',
                hidden: true,
                handler: function () {
                    this.showValidationMsg();
                }
            }
        },

        validationMsg: ''
    },

    markInvalid: function (Msg) {
        this.addCls('x-invalid');
        this.getTriggers().invalid.show();
        this.setValidationMsg(Msg);
    },

    unMarkInvalid: function () {
        this.removeCls('x-invalid');
        this.getTriggers().invalid.hide();
        this.setValidationMsg('');
    },

    showValidationMsg: function () {
        Ext.toast(this.getValidationMsg(), 3000);
    }
});