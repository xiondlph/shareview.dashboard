Ext.define('Admin.override.field.Text', {
    override :'Ext.field.Text',

    requires: [
        'Ext.String',
        'Admin.util.form.field.VTypes'
    ],

    config: {
        help: null,
        triggers: {
            help: {
                cls: 'trigger-glyph trigger-glyph-help',
                hidden: true
            },
            invalid: {
                cls: 'trigger-glyph trigger-glyph-invalid',
                hidden: true
            }
        },

        validationMsg: ''
    },

    allowBlank: true,
    validateBlank: false,
    validateOnBlur: true,
    validateOnChange: true,
    vtype: null,

    blankText: 'Поле обязательное для заполнения',
    minLengthText: 'Длина текста не должна быть меньше {0} символов',
    maxLengthText: 'Длина текста не должна быть больше {0} символов',

    initialize: function() {
        var me = this,
            triggers = me.getTriggers();

        me.callParent();

        me.getComponent().on({
            change: 'onChange',
            scope: this
        });

        triggers.help.setHandler(me.showHelp);
        triggers.invalid.setHandler(me.showError);
    },

    getErrors: function(value) {
        var me      = this,
            vtypes  = Admin.form.VTypes,
            vtype   = me.vtype,
            format  = Ext.String.format,
            errors  = [],
            trimmed, isBlank;

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
        var me = this,
            value = me.getValue(),
            errors = me.getErrors(value);

        return Ext.isEmpty(errors);
    },

    validate: function() {
        var me = this,
            value = me.getValue(),
            errors = me.getErrors(value),
            isValid = Ext.isEmpty(errors);

        if (isValid) {
            me.clearInvalid();
        } else {
            me.markInvalid(errors);
        }

        me.up('formpanel') && me.up('formpanel').fireEvent('validitychange');

        return isValid;
    },

    onChange: function (field, value, lastValue) {
        if (this.getLabelAlign() === 'placeholder' && value && lastValue === null) {
            this.animatePlaceholderToLabel();
        }

        if (this.validateOnChange && lastValue !== null) {
            this.validate();
        }
    },

    onBlur: function(e) {
        this.callParent([e]);

        if (this.validateOnBlur) {
            this.validate();
        }
    },

    applyHelp: function (help) {
        if (help) {
            this.getTriggers().help.show();
        }

        return help;
    },

    markInvalid: function (Msg) {
        this.addCls('x-invalid');
        this.getTriggers().invalid.show();
    },

    clearInvalid: function () {
        this.removeCls('x-invalid');
        this.getTriggers().invalid.hide();
    },

    showError: function () {
        var me = this,
            value = me.getValue(),
            errors = me.getErrors(value);

        Ext.toast(errors[0], 30000);
    },

    showHelp: function () {
        Ext.toast(this.getHelp(), 30000);
    }
});
