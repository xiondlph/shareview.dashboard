Ext.define('Admin.override.field.Text', {
    override :'Ext.field.Text',

    requires: [
        'Ext.String',
        'Admin.util.form.field.VTypes'
    ],

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

    allowBlank: true,
    validateBlank: false,
    vtype: null,

    blankText: 'Поле обязательное для заполнения',
    minLengthText: 'Длина текста не должна быть меньше {0} символов',
    maxLengthText: 'Длина текста не должна быть больше {0} символов',

    getErrors: function(value) {
        var me      = this,
            vtypes  = Admin.form.VTypes,
            vtype   = me.vtype,
            format  = Ext.String.format,
            errors  = [],
            trimmed, isBlank;
debugger;
        trimmed = Ext.String.trim(value);

        if (trimmed.length < 1) {
            if (!me.allowBlank) {
                errors.push(me.blankText);
            }

            if (!me.validateBlank) {
                return errors;
            }
            isBlank = true;
        }

        if (!isBlank && value.length < me.minLength) {
            errors.push(format(me.minLengthText, me.minLength));
        }

        if (value.length > me.maxLength) {
            errors.push(format(me.maxLengthText, me.maxLength));
        }

        if (vtype) {
            if (!vtypes[vtype](value, me)) {
                errors.push(me.vtypeText || vtypes[vtype +'Text']);
            }
        }

        return errors;
    },

    isValid: function () {
        return false;
    },

    applyHelp: function (help) {
        if (help) {
            this.getTriggers().help.show();
        }

        return help;
    },

    updatePlaceholderState: function () {
        !Ext.isEmpty(this.getValue()) && this.animatePlaceholderToLabel();
    },

    markInvalid: function (Msg) {
        var me = this;

        me.addCls('x-invalid');
        me.getTriggers().invalid.show();
        me.setValidationMsg(Msg);

        me.up('formpanel') && me.up('formpanel').fireEvent('validitychange');
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
        this.getErrors('');
        Ext.toast(this.getHelp(), 30000);
    }
});