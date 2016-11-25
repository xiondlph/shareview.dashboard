Ext.define('Admin.ux.form.Form',{
	extend: 'Ext.form.Panel',
	xtype: 'admin.form',

    responsiveCls: 'big-50 small-100',

    bodyPadding: 10,
	defaultType: 'textfield',
	defaults: {
		submitEmptyText: false,
		allowBlank: false,
		msgTarget: 'side',
		labelWidth: 120,
		anchor: '100%'
	}
});
