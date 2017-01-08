Ext.define('Admin.view.authentication.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication-login',
    links: {
        auth: {
            reference: 'Admin.Model.Auth',
            create: true
        }
    },

    formulas: {
        isLoginFormFilled: function (get) {
            return Boolean(get('auth.email') && get('auth.password'));
        }
    }
});
