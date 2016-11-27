Ext.define('Admin.ux.window.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lockingwindow',

    requires: [
        'Ext.layout.container.VBox'
    ],

    closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});
