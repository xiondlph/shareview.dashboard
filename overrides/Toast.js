Ext.define('Admin.override.Toast', {
    override: 'Ext.Toast'
}, function (Toast) {
    function getInstance() {
        if (!Ext.Toast._instance) {
            Ext.Toast._instance = Ext.create('Ext.Toast');
        }
        return Ext.Toast._instance;
    }

    Ext.toast = function (message, timeout) {
        var toast = getInstance(),
            config = message;

        if (Ext.isString(message)) {
            config = {
                message: message,
                timeout: timeout
            };
        }

        //<debug>
        if (!config) {
            throw new Error("Toast requires a message");
        }
        //</debug>

        if (config.timeout === undefined) {
            config.timeout = Ext.Toast.prototype.config.timeout;
        }

        if (!toast.isRendered() || toast.isHidden()) {
            toast.show(config);
        }

        return toast;
    }
});