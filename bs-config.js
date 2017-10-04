var proxy = require('http-proxy-middleware');
var apiProxy = proxy('/api', {
    target: 'http://localhost:59150',
    changeOrigin: true   // for vhosted sites
});

module.exports = {
    files: ["./**/*.{html,htm,js,css}"],
    browser: "chrome",
    server: {
        middleware: {
            1: apiProxy,
            2: require('connect-history-api-fallback')({
            index: '/src/system_index.html',
            verbose: false})
        }
    }
};