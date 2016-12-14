Ext.define('Admin.Model.Auth', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.validator.Format',
        'Ext.data.validator.Presence'
    ],

    fields: [
        {   name:   'email',    type: 'string', allowBlank: false   },
        {   name:   'password', type: 'string', allowBlank: false   }
    ],

    validators: {
        email: [{
            type: 'presence',
            message: 'Следует указать E-Mail'
        }, {
            type: 'format',
            matcher: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Неверный формат E-Mail'
        }],
        password: {
            type: 'presence',
            message: 'Следует указать пароль'
        }
    }
});