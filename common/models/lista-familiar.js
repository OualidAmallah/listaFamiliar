'use strict';

module.exports = function(Listafamiliar) {

    Listafamiliar.beforeRemote('create', function (context, centro, next) {
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });
};
