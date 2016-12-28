Ext.define('Admin.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'Admin.view.authentication.Login'
    ],

    onLaunch: function () {
        Admin.Overlay = this.showOverlay;

        //this.loadProfile();
        this.showDashboard();
    },

    onAuth: function (userData) {
        Ext.Viewport.remove('login');

        this.showDashboard(userData);
    },
    
    loadProfile: function () {
        var me = this,
            overlay;

        Ext.Ajax.request({
            //url: '/api/profile'
            url: 'resources/data/forbidden.json'
        }).then(function(response, opts) {
            var data = Ext.decode(response.responseText);

            if (data.success) {
                me.showDashboard(data);
            } else {
                me.showLoginForm();
            }
        }, function (response, opts) {
            if (response.status === 403) {
                me.showLoginForm();
                return;
            }

            Admin.Overlay();
        });
    },

    showLoginForm: function () {
        var Login = Ext.create('Admin.view.authentication.Login', {
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
        Ext.Viewport.add({
            xtype: 'admin.dashboard'
        });
    },

    /**
     * Перехват ошибок аякс запросов
     */
    setAjaxSettings: function () {
        Ext.Ajax.on('requestexception', function(connection, response, options) {
            if (response.status === 403) {
                // reload
                return;
            }

            Admin.Overlay();
        }, this);
    },

    showOverlay: function (message) {
        var me = this,
            msg = message || 'Действие временно недоступно.<br />Попробуйте повторить позже!',
            overlay = Ext.create('Ext.ActionSheet', {
                items: [{
                    xtype: 'label',
                    html: msg
                }, {
                    text: 'OK',
                    scope: me,
                    handler: function() {
                        overlay.hide();
                    }
                }]
            });

        Ext.Viewport.add(overlay);
        overlay.show();
    }
});
