const server = require('./app');
server.set('port', process.env.PORT || 5000);
// Listen to port
server.listen(server.get('port'), function () {
    console.log('App is listening on port ' + server.get('port'));
});
//# sourceMappingURL=server.js.map