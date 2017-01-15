Ext.define('Admin.ux.Overlay',{
    extend: 'Ext.ActionSheet',
    xtype: 'admin.overlay',

    requires: [
        'Ext.behavior.Draggable'
    ],

    config: {
        baseCls: 'admin-overlay',
        userIcon: null,
        fn: null,
        hideOnMaskTap: true
    },

    getElementConfig: function() {
        return {
            reference: 'element',
            classList: ['x-container', 'x-unsized'],
            children: [
                {
                    reference: 'glyphElement',
                    classList: ['x-font-icon', 'admin-overlay-glyph'],
                    tag: 'span'
                },
                {
                    reference: 'innerElement',
                    className: 'x-inner'
                },
                {
                    reference: 'tipElement',
                    className: 'x-anchor',
                    hidden: true
                }
            ]
        };
    },

    applyUserIcon: function (options) {
        var glyph = options || 'none';

        if (this._userIcon) {
            this.glyphElement.removeCls('admin-overlay-glyph', null, this._userIcon);
        }

        this.glyphElement.addCls('admin-overlay-glyph', null, glyph);

        return glyph;
    },

    onClick: function (button) {
        var config = this.getConfig(),
            itemId = button.getItemId();


        if (typeof config.fn == 'function') {
            config.fn(itemId);
        }

        this.hide();
    },

    show: function (options) {
        if (!this.getParent() && Ext.Viewport) {
            Ext.Viewport.add(this);
        }

        if (!options) {
            return this.callParent();
        }

        var config = Ext.apply({
            userIcon: null
        }, options);

        config.html = config.html || 'Действие временно недоступно.<br />Попробуйте повторить позже!';

        this.setConfig(config);

        this.callParent();

        return this;
    },

    info: function (message) {
        return this.show({
            userIcon: 'info',
            items: [],
            html: message
        });
    },

    error: function (message) {
        return this.show({
            userIcon: 'error',
            items: [],
            html: message
        });
    },

    alert: function (message, fn) {
        return this.show({
            userIcon: 'info',
            fn: fn,
            html: message,
            items: [{
                text: 'OK',
                itemId: 'ok',
                scope: this,
                handler: 'onClick'
            }]
        });
    },

    confirm: function (message, fn) {
        return this.show({
            userIcon: 'info',
            fn: fn,
            html: message,
            items: [{
                text: 'OK',
                itemId: 'ok',
                scope: this,
                handler: 'onClick'
            }, {
                text: 'Отмена',
                itemId: 'cancel',
                scope: this,
                handler: 'onClick'
            }]
        });
    }
}, function (Overlay) {
    Ext.onInternalReady(function() {
        Admin.Overlay = new Admin.ux.Overlay();
    });
});
