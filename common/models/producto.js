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
          var async = require('async');

          Producto.find({where: {listaFamiliarId:listaId}}, function(err, products) {
            if(err) callback(err);
            var i=0;

            async.forEachOf(products, (producto, key, cb) => {
               producto.comprar=false;
               console.log(i++);
               producto.save(function(err){
                if (err) return cb(err);
                cb();
               });

            }, err => {
                if (err) console.error(err.message);
                console.log("hemos llegado al final");
                Producto.find({where: {listaFamiliarId:listaId}}, function(err, product) {
                    if(err) callback(err);
                    console.log("estamos en el callback");
                    callback(null, product);
                });
            });
           
        });
        
    });

    
  };


  /**
 * comprar producto con id 
 * @param {object} context me devueleve usuario
 * @param {Function(Error, object)} callback
 */

Producto.prototype.comprarproducto = function(callback) {
    var comprado;
    var producto=this;

    producto.comprar= !(producto.comprar);  
    producto.save(function(err){
        if(err) callback(err);
        Producto.find({where: {listaFamiliarId:producto.listaFamiliarId}}, function(err, products) {
            if(err) callback(err);
            callback(null, products);
        });
    });
    
   
  };
  
};
