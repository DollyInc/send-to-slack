https = require('https');

module.exports = sendToSlack = function(domain, token) {
    return function (message, channel, callback) {
        callback = (typeof callback === 'function') ? callback : function(response) {};

        var req = https.request({
            method: 'POST',
            port: 443,
            host: domain + '.slack.com',
            path: '/services/hooks/slackbot?token=' + token + '&channel=' + encodeURIComponent(channel),
            headers: {
            'Content-Type': 'text/plain',
            'Content-Length': message.length
            }
        }, callback);

        req.write(message);
        req.end();
    };
};