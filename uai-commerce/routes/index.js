var express = require('express');
var router = express.Router();
var db = require("../db");
var usuario_logado

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res)=>{
  let filtro = {Email: req.body.email, Senha: req.body.password}

  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  Clientes.find(filtro).lean().exec(function (e, docs) {
    if(!e){
      usuario_logado = docs[0];
      res.render('home', { docs});
    }else{
      console.log('Erro ao fazer login!');
    }
  });
});

router.get('/nova_conta', function(req, res, next) {
  res.render('nova_conta', { title: 'Express' });
});

router.post('/nova_conta', function (req, res) {
  var novo_usuario = {
    Nome: req.body.name, 
    Email: req.body.email, 
    Telefone: req.body.phone,
    Senha: req.body.password,
    CPF: req.body.cpf,
    RG: req.body.rg,
    DataNascimento:req.body.birthday
  }
  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  var novo_cliente = new Clientes(novo_usuario);
  novo_cliente.save(function (err) {
    if (err) {
      console.log("Error! " + err.message);
      return err;
    }
    else {
      Clientes.find(novo_usuario).lean().exec(function (e, docs) {
        if(!e){
          usuario_logado = docs[0];
          res.render('home', { docs});
        }else{
          console.log('Erro ao fazer login!');
        }
      });
    }
  });
});

module.exports = router;
