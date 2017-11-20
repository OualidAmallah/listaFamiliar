'use strict';

var config = require('../config.local.js')

module.exports = function(app) {
    //data sources
    var mysqlDs = app.dataSources.mysqlDs;
    //var Usuario = app.models.Usuario;
    //var Role = app.models.Role;
    //var RoleMapping = app.models.RoleMapping;
    
    if(process.env.AUTOMIGRATE) {
        mysqlDs.automigrate(null, function (err) {
            if (err) console.log(err);
            console.log('> Models migrated to tables');
     
        });
    }
}