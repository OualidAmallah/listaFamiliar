'use strict';

module.exports = function(Listafamiliar) {

    Listafamiliar.beforeRemote('create', function (context, listafamiliar, next) {
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });

    Listafamiliar.afterRemote('create', function (context, listafamiliar, next) {
        var app = Listafamiliar.app;
        var  Usuario= app.models.Usuario;
        var  userId=context.req.accessToken.userId

        Usuario.findById(userId, function(err, usuario){
            if(err) next(err) 
          //  if (usuario){
                usuario.listaFamiliarId=listafamiliar.id;
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

Listafamiliar.prototype.solicitud = function(context, callback) {
    var solicitud
    var listaFamiliar = this;
    var  userId=context.req.accessToken.userId

    listaFamiliar.solicitudes.add(userId, function(err) {
        if(err) callback(err);
        solicitud={
            listafamiliarId: listaFamiliar.id,
            usuarioId: userId
        };
        callback(null, solicitud);
      });
  };
  





};
