Ext.define('Admin.ux.form.Form',{
	extend: 'Ext.form.Panel',
	xtype: 'admin.form',

	defaultType: 'textfield',
	bodyPadding: 10,
	margin: 10,
	defaults: {
		submitEmptyText: false,
		allowBlank: false,
		msgTarget: 'side',
		labelWidth: 120,
		anchor: '100%'
	}
});
