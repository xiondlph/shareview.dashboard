Ext.define('Admin.Model.Profile', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.validator.Format',
        'Ext.data.validator.Presence'
    ],

    fields: [
        {   name:   'email',    type: 'string', allowBlank: false   },
        {   name:   'address', type: 'string', allowBlank: false   }
    ]
});