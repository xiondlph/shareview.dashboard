Ext.define('Admin.override.field.Text', {
    override :'Ext.field.Text',

    listeners: {
        change: function () {
            this.unMarkInvalid();
        }
    },

    config: {
        help: null,
        triggers: {
            help: {
                cls: 'trigger-glyph trigger-glyph-help',
                hidden: true,
                handler: function () {
                    this.showHelp();
                }
            },
            invalid: {
                cls: 'trigger-glyph trigger-glyph-invalid',
                hidden: true,
                handler: function () {
                    this.showValidationMsg();
                }
            }
        },

        validationMsg: ''
    },

    applyHelp: function (help) {
        if (help) {
            this.getTriggers().help.show();
        }

        return help;
    },

    updatePlaceholderState: function () {
        Ext.isEmpty(this.value) && this.animatePlaceholderToLabel();
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
        Ext.toast(this.getValidationMsg(), 30000);
    },

    showHelp: function () {
        Ext.toast(this.getHelp(), 30000);
    }
});