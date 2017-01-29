Ext.define('Admin.ux.Msg', {
    extend: 'Ext.MessageBox',
    xtype: 'admin.msg',

    config: {
        ui: 'admin'
    }
}, function(Overlay) {
    Ext.onInternalReady(function() {
        Admin.Msg = new Admin.ux.Msg();
    });
});

