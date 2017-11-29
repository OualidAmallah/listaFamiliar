'use strict';

module.exports = function (Listafamiliar) {

    Listafamiliar.beforeRemote('create', function (context, listafamiliar, next) {
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });

    Listafamiliar.afterRemote('create', function (context, listafamiliar, next) {
        var app = Listafamiliar.app;
        var Usuario = app.models.Usuario;
        var userId = context.req.accessToken.userId

        Usuario.findById(userId, function (err, usuario) {
            if (err) next(err)
            //  if (usuario){
            usuario.listaFamiliarId = listafamiliar.id;
            usuario.save();
            next();
            // }
        });
    });

    /**
     * pedir solicitud
    * @param {object} context me da context
    * @param {Function(Error, object)} callback
    */

    Listafamiliar.prototype.solicitud = function (context, callback) {
        var solicitud;
        var listaFamiliar = this;
        var userId = context.req.accessToken.userId
        var Usuario = Listafamiliar.app.models.Usuario;



        Usuario.findById(userId, function (err, usuario) {
            if (err) next(err);
            usuario.solicitudes.findOne(function (err, solicitudAnteriore) {
                if (err) callback(err);
                if (solicitudAnteriore == null) {
                    listaFamiliar.solicitudes.add(usuario, function (err, vuelta) {
                        if (err) callback(err);
                        callback(null, vuelta);
                    });
                } else {
                    solicitudAnteriore.listaFamiliarId=listaFamiliar.id;
                    solicitudAnteriore.save(function(err, solicitud){
                        solicitud:{
                            listafamiliarId: listaFamiliar.id 
                            usuarioId: userId
                        }
                        callback(null, solicitud);
                    }
                    );
                }
            });
        });


    };
};

