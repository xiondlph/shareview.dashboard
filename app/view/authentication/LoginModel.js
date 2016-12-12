Ext.define('Admin.view.authentication.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication-login',
    links: {
        credentials: {
            reference: 'Admin.Model.Login',
            create: true
        }
    },

    formulas: {
        isCredentialsOk: function (get) {
            return Boolean(get('credentials.email') && get('credentials.password'));
        }
    }
});
