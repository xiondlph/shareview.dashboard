Ext.define('Admin.ux.Overlay',{
    extend: 'Ext.Panel',
    xtype: 'admin.overlay',

    config: {
        ui: 'admin-overlay',

        hideOnMaskTap: true,
        centered: true,
        floated: true,
        modal: true,

        message: null,

        tools: [{
            type: 'close',
            handler: function() {
                this.up('panel').hide();
            }
        }],

        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },

        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        }
    },

    initialize: function () {
        this.callParent();

        this.on('resize', this.onOverlayResize);
    },

    onOverlayResize: function (cmp) {
        if (cmp.getHeight() < this.innerElement.getHeight()) {
            this.setHeight('90%');
        } else {
            this.setHeight('auto');
        }
    },

    applyMessage: function(config) {
        config = {
            html : config,
            cls  : this.getBaseCls() + '-text'
        };

        return Ext.factory(config, Ext.Component, this._message);
    },

    updateMessage: function(newMessage) {
        if (newMessage) {
            this.add(newMessage);
        }
    },

    getMessage: function() {
        if (this._message) {
            return this._message.getHtml();
        }

        return null;
    },

    show: function (config) {
        if (!this.getParent() && Ext.Viewport) {
            Ext.Viewport.add(this);
        }

        if (!config) {
            return this.callParent();
        }

        this.setConfig(config);
        this.callParent();

        return this;
    }

}, function(Overlay) {
    Ext.onInternalReady(function() {
        Admin.Overlay = new Admin.ux.Overlay();
    });
});