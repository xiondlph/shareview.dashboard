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
        }
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
        var triggers = this.getTriggers();

        this.callParent();

        this.getComponent().on({
            change: 'onChange',
            scope: this
        });

        triggers.help.setHandler(this.showHelp);
        triggers.invalid.setHandler(this.showError);
    },

    getErrors: function(value) {
        var vtypes  = Admin.form.VTypes,
            vtype   = this.vtype,
            format  = Ext.String.format,
            errors  = [],
            trimmed, isBlank;

        trimmed = Ext.String.trim(value);

        if (trimmed.length < 1) {
            if (!this.allowBlank) {
                errors.push(this.blankText);
            }

            if (!this.validateBlank) {
                return errors;
            }
            isBlank = true;
        }

        if (!isBlank && value.length < this.minLength) {
            errors.push(format(this.minLengthText, this.minLength));
        }

        if (value.length > this.maxLength) {
            errors.push(format(this.maxLengthText, this.maxLength));
        }

        if (vtype) {
            if (!vtypes[vtype](value, this)) {
                errors.push(this.vtypeText || vtypes[vtype +'Text']);
            }
        }

        return errors;
    },

    isValid: function () {
        var value = this.getValue(),
            errors = this.getErrors(value);

        return Ext.isEmpty(errors);
    },

    validate: function() {
        var value = this.getValue(),
            errors = this.getErrors(value),
            valid = Ext.isEmpty(errors);

        if (valid !== this.wasValid) {
            this.onValidityChange(valid);
            this.wasValid = valid;
        }

        return valid;
    },

    onChange: function (field, value, lastValue) {
        if (lastValue === null && value && this.getLabelAlign() === 'placeholder') {
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

    onValidityChange: function (valid) {
        if (valid) {
            this.clearInvalid();
        } else {
            this.markInvalid();
        }

        this.up('formpanel') && this.up('formpanel').fireEvent('validitychange');
    },

    applyHelp: function (help) {
        if (help) {
            this.getTriggers().help.show();
        }

        return help;
    },

    markInvalid: function () {
        this.addCls('x-invalid');
        this.getTriggers().invalid.show();
    },

    clearInvalid: function () {
        this.removeCls('x-invalid');
        this.getTriggers().invalid.hide();
    },

    showError: function () {
        var value = this.getValue(),
            errors = this.getErrors(value);

        Ext.toast(errors[0], 30000);
    },

    showHelp: function () {
        Ext.toast(this.getHelp(), 30000);
    }
});
