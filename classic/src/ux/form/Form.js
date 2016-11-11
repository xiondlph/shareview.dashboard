Ext.define('Admin.ux.form.Form',{
	extend: 'Ext.form.Panel',
	xtype: 'admin.form',

	plugins: 'responsive',

	responsiveConfig: {
		'width > 800': {
			width: '40%'
		},

		'width <= 800': {
			width: '90%'
		}
	},

	defaultType: 'textfield',
	defaults: {
		submitEmptyText: false,
		allowBlank: false,
		msgTarget: 'side',
		labelWidth: 120,
		anchor: '100%'
	}
});
