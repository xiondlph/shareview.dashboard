Ext.define('Admin.Model.Login', {
    extend: 'Ext.data.Model',

    fields: [
        {   name:   'email',    type: 'string', allowBlank: false   },
        {   name:   'password', type: 'string', allowBlank: false   }
    ],

    validators: [
        {   field: 'email',     type: 'inclusion',   message: 'Login empty', list: ['male', 'female']  },
        {   field: 'password',  type: 'presence',   message: 'Password empty'   }
    ]
});