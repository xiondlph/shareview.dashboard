Ext.define('Admin.util.form.field.VTypes', (function(){

    var alpha = /^[a-zA-Z_]+$/,
        alphanum = /^[a-zA-Z0-9_]+$/,
        email = /^(")?(?:[^\."\s])(?:(?:[\.])?(?:[\w\-!#$%&'*+/=?^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
        url = /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST))\/?)/i,
        IPAddress = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;


    return {
        singleton: true,
        alternateClassName: 'Admin.form.VTypes',

        // Валидация Email
        'email' : function(value){
            return email.test(value);
        },
        'emailText' : 'This field should be an e-mail address in the format "user@example.com"',
        'emailMask' : /[\w.\-@'"!#$%&'*+/=?^_`{|}~]/i,

        // Валидация URL
        'url' : function(value){
            return url.test(value);
        },
        'urlText' : 'This field should be a URL in the format "http:/'+'/www.example.com"',

        // Валидация Alpha
        'alpha' : function(value){
            return alpha.test(value);
        },
        'alphaText' : 'This field should only contain letters and _',
        'alphaMask' : /[a-z_]/i,

        // Валидация Alphanum
        'alphanum' : function(value){
            return alphanum.test(value);
        },
        'alphanumText' : 'This field should only contain letters, numbers and _',
        'alphanumMask' : /[a-z0-9_]/i,

        // Валидация IP адреса
        'IPAddress':  function(value) {
            return IPAddress.test(value);
        },
        'IPAddressText': 'Must be a numeric IP address',
        'IPAddressMask': /[\d\.]/i,

        //Валидация подтверждения пароля
        'password': function (value, field) {
            var initialPasswordField = field.up('formpanel').query('[initialPassword]');

            if ( initialPasswordField.length === 1 && initialPasswordField[0].xtype === 'passwordfield') {
                return (value === initialPasswordField[0].getValue());
            }
            return true;
        },
        'passwordText': 'Пароли не совпадают'
    };
}()));
