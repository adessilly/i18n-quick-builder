module.exports = {
    files: ["./**/template.{html,htm}"],
    server: {
        middleware: {
            1: function (req, res, next) {
                const execSync = require('child_process').execSync;
                execSync('node build-i18n.js');
                next();
            }
        }
    }
};