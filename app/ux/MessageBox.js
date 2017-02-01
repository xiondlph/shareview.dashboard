Ext.define('Admin.ux.MessageBox',{
    extend: 'Ext.MessageBox',
    xtype: 'admin.messagebox',

    config: {
        hideOnMaskTap: true,
        ui: 'admin-messagebox'
    }

}, function(MessageBox) {
    Ext.onInternalReady(function() {
        Admin.Msg = new Admin.ux.MessageBox();
    });
});