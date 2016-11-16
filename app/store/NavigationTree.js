Ext.define('Admin.store.NavigationTree', {
	extend: 'Ext.data.TreeStore',

	storeId: 'NavigationTree',

	fields: [{
		name: 'text'
	}],

	root: {
		expanded: true,
		children: [
			{
				text: 'Профиль',
				iconCls: 'x-fa fa-desktop',
				viewType: 'admindashboard',
				routeId: 'dashboard',
				leaf: true
			},
			{
				text: 'Оплата',
				iconCls: 'x-fa fa-credit-card',
				viewType: 'email',
				leaf: true
			},
			{
				text: 'Помощь',
				iconCls: 'x-fa fa-question',
				viewType: 'profile',
				leaf: true
			}
		]
	}
});

