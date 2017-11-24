'use strict';

module.exports = function(Usuario) {
/**
 * aceptar Solicitud
 * @param {object} context me da token
 * @param {Function(Error, array)} callback
 */

Usuario.prototype.aceptarSolicitud = function(context, callback) {
    var aceptarSolicitud;
    var usuarioSolicitante = this;
    var listaId;
    
    var userId=context.req.accessToken.userId

    Usuario.findById(userId, function(err, usuarioAutenticado){
        if(err) callback(err); 
         listaId=usuarioAutenticado.listaFamiliarId;

         usuarioSolicitante.solicitudes.findById(listaId, function(err, listaSolicitada){
            if(err) callback(err);
            if(listaSolicitada) { 
                var listaFamiliaId=listaSolicitada.id;
                usuarioSolicitante.listaFamiliarId=listaFamiliaId;
                usuarioSolicitante.save();
            }

            usuarioSolicitante.solicitudes.remove(listaSolicitada, function(err,listaSolicitada) {
                if(err) callback(err);
                usuarioSolicitante.save();

                Usuario.find({where: {listaFamiliarId:usuarioAutenticado.listaFamiliarId}}, function(err, lista) {
                    if(err) callback(err);
                    aceptarSolicitud=lista;
                        callback(null, aceptarSolicitud);
                });
              }); 
        });

    });
   
  };

};
