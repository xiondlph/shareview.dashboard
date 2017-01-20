Ext.define('Admin.util.form.field.VTypes', (function(){

    var alpha = /^[a-zA-Z_]+$/,
        alphanum = /^[a-zA-Z0-9_]+$/,
        email = /^(")?(?:[^\."\s])(?:(?:[\.])?(?:[\w\-!#$%&'*+/=?^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
        url = /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST))\/?)/i;


    return {
        singleton: true,
        alternateClassName: 'Admin.form.VTypes',

        'email' : function(value){
            return email.test(value);
        },

        'emailText' : 'This field should be an e-mail address in the format "user@example.com"',

        'emailMask' : /[\w.\-@'"!#$%&'*+/=?^_`{|}~]/i,

        'url' : function(value){
            return url.test(value);
        },

        'urlText' : 'This field should be a URL in the format "http:/'+'/www.example.com"',

        'alpha' : function(value){
            return alpha.test(value);
        },

        'alphaText' : 'This field should only contain letters and _',

        'alphaMask' : /[a-z_]/i,

        'alphanum' : function(value){
            return alphanum.test(value);
        },

        'alphanumText' : 'This field should only contain letters, numbers and _',

        'alphanumMask' : /[a-z0-9_]/i
    };
}()));
