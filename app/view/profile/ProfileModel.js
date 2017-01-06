Ext.define('Admin.view.profile.ProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profile-profile',
    formulas: {
        isFilled: function (get) {
            return Boolean(get('setting.email') && get('setting.address'));
        }
    }
});
