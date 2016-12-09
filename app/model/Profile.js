Ext.define('Admin.model.Profile', {
    extend: 'Ext.data.Model',

    idProperty: 'email',

    fields: [
        { name: 'email', type: 'auto' },
        { name: 'address', type: 'auto' }
    ],

    proxy: {
        type: 'rest',
        url : 'resources/data/Profile.json',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'profile'
        }
    }
});