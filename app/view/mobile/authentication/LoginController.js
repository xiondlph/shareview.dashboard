Ext.define('Admin.view.mobile.authentication.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobile-authentication-login',

    requires: [
        'Ext.Toast'
    ],

    control: {
        'textfield': {
            focus: 'onFieldFocus',
            keyup: 'fieldKeyUp'
        },

        '#loginbtn': {
            tap: 'onLoginButton'
        }
    },

    config: {
        containerHeight: null
    },

    onLoginButton: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.adminLoginForm,
            vm = me.getViewModel(),
            auth = vm.get('auth'),
            validate = auth.validate(),
            firstErrField;

        if (validate.isValid()) {
            form.setMasked({
                xtype: 'loadmask',
                message: 'Авторизация...'
            });

            Ext.Ajax.request({
                url: '/user/signin',
                //url: 'resources/data/authentication/login/success.json',
                method: 'post',
                jsonData: form.getValues()
            }).then(function (response, opts) {
                var data = Ext.decode(response.responseText);
                form.setMasked(false);

                if (data.success) {
                    me.getView().fireEvent('auth', data);
                } else {
                    Admin.Overlay('Неверные E-mail или пароль');
                }
            }, function (response, opts) {
                form.setMasked(false);
            });
        } else {
            validate.each(function (item) {
                form.down("field[name='"+item.field+"']").markInvalid(item.msg || item[0].msg);
            });
        }
    },

    onFieldFocus: function (field) {
        if (Ext.platformTags.desktop) {
            return;
        }

        var me = this;

        setTimeout(function () {
            me.fieldMoveTop(field);
        }, 700);
    },

    fieldKeyUp: function (field, e) {
        var btn;

        if( e.event.keyCode === 13) {
            btn = field.up('formpanel').getComponent('loginbtn');

            !btn.getDisabled() && btn.fireEvent('tap');
        }
    },

    onContainerResize: function (cmp) {
        if (Ext.platformTags.desktop) {
            return;
        }

        this.setContainerHeight(cmp.getSize().height);
    },


    updateContainerHeight: function (height, oldValue) {
        if (oldValue === undefined) {
            return;
        }

        var refs = this.getReferences();

        // Верхняя панель
        if (height < 300) {
            refs.adminMainBar.setHeight(0);
        } else {
            refs.adminMainBar.setHeight(60);
        }
    },

    fieldMoveTop: function (field) {
        var scroller = field.up('formpanel').getScrollable(),
            offset = field.element.getY();

        if (offset > 10) {
            offset -= 10;
        }

        scroller.scrollTo(null, scroller.position.y + offset, true);
    }
});
