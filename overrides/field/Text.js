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
                cls: 'trigger-glyph trigger-invalid',
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
        Ext.toast({
            message: this.getValidationMsg(),
            timeout: 3000,
            modal: true
        });
    }
});