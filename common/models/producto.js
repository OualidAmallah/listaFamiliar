'use strict';

module.exports = function(Producto) {
   /**
 * borrar todas la compras de mi lista
 * @param {object} context me devuelve usuario autenticado
 * @param {Function(Error, array)} callback
 */

Producto.limpiarLista = function(context, callback) {
    var limpiarLista;
    var producto=this
    var userId = context.req.accessToken.userId
    var Usuario = Producto.app.models.Usuario;
    var listaId;

    Usuario.findById(userId, function (err, usuarioAutenticado) {
        if (err) callback(err);
          listaId=usuarioAutenticado.listaFamiliarId;

          Producto.find({where: {listaFamiliarId:listaId}}, function(err, product) {
            if(err) callback(err);
            product.forEach(function (producto) {
                producto.comprar=false;
                producto.save();
            })
            Producto.find({where: {listaFamiliarId:listaId}}, function(err, product) {
                if(err) callback(err);
                callback(null, product);
            });
           
        });
        
    });
    
  };
};
