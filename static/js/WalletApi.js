var exec = require('/cordova/exec');

exports.login = function (password, success, error) {
    exec(success, error, 'WalletApi', 'login', [password]);
};

exports.logout = function (success, error) {
    exec(success, error, 'WalletApi', 'logout', []);
};
