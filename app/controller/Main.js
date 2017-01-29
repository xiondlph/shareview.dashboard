Ext.define('Admin.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'Admin.ux.Msg',
        'Admin.view.authentication.Login'
    ],

    onLaunch: function () {
        this.setAjaxSettings();
        this.loadProfile();
        //this.showDashboard();
    },

    onAuth: function (userData) {
        Ext.Viewport.remove('login');

        this.showDashboard(userData);
    },
    
    loadProfile: function () {
        var me = this;

        Ext.Ajax.request({
            url: '/api/profile',
            //url: 'resources/data/forbidden.json',
        }).then(function(response, opts) {
            var data = Ext.decode(response.responseText);

            if (data.success) {
                me.showDashboard(data);
            } else {
                me.showLoginForm();
            }
        });
    },

    showLoginForm: function () {
        var Login = Ext.create({
            xtype: 'login',
            itemId: 'login',
            listeners: {
                auth: {
                    scope: this,
                    fn: this.onAuth
                }
            }
        });
        Ext.Viewport.add(Login);
    },

    showDashboard: function (userData) {
        var dashboard = Ext.create({
            xtype: 'admin.dashboard'
        });

        Ext.Viewport.add(dashboard);

        dashboard.getViewModel().setLinks({
            profile: {
                reference: 'Admin.Model.Profile',
                create: {
                    email: userData.profile.email,
                    address: userData.profile.address
                }
            }
        });
    },

    /**
     * Перехват ошибок аякс запросов
     */
    setAjaxSettings: function () {
        Ext.Ajax.on('requestexception', function(connection, response, options) {
            if (response.status === 403) {
                if (Ext.Viewport.getActiveItem().xtype === 'admin.dashboard') {
                    window.location.reload();
                } else {
                    this.showLoginForm();
                }
                return;
            }

            Admin.Msg.show({
                title: 'Ошибка',
                message: 'Действие временно недоступно.',
                buttons: Ext.MessageBox.OK
            });
        }, this);
    }
});
