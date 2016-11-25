Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        profile: {
            email: 'admin@shareview.ru',
            requests: '0',
            address: '127.0.0.1',
            key: 'fff'
        }
    }
});
