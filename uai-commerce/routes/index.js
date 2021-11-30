var express = require('express');
var router = express.Router();
var db = require("../db");
var usuario_logado
var senhaAdmin = 'admin123'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res)=>{
  let filtro = {Email: req.body.email, Senha: req.body.password}

  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  Clientes.find(filtro).lean().exec(function (e, docs) {
    if(!e){
      //usuario_logado = docs[0];
      //res.render('home', { docs});
      if(docs[0].ADM == "1"){
        usuario_logado = docs[0];
        res.render('home_adm', { docs});
      }
      if(docs[0].ADM == "0"){
        usuario_logado = docs[0];
        res.render('home', { docs});
      }else{
        console.log('Erro ao fazer login!');      
      }
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
    DataNascimento:req.body.birthday,
    ADM: 0
  }

  if(req.body.passwordADM == senhaAdmin){
    novo_usuario.ADM = 1;
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

router.get('/edita_conta', function(req, res, next) {
  res.render('edita_conta', { docs: [usuario_logado] });
});

router.post('/edita_conta', function(req, res, next) {
  var usuario_editado = {
    Nome: req.body.name, 
    Email: req.body.email, 
    Telefone: req.body.phone,
    Senha: req.body.password,
    CPF: req.body.cpf,
    RG: req.body.rg,
    DataNascimento:req.body.birthday
  }

  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  Clientes.updateOne({_id: usuario_logado._id}, usuario_editado, function (err) {
      if (err)    return console.error(err);
      else{
        Clientes.find(usuario_editado).lean().exec(function (e, docs) {
          if(!e){
            usuario_logado = docs[0];
            res.render('home', { docs});
          }else{
            console.log('Erro ao fazer edição!');
          }
        });
      }
  });
});

router.get('/remove_conta', function(req, res, next) {
  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  Clientes.deleteOne({_id: usuario_logado._id}).lean().exec(function (err, docs) {
    if(err)    return console.error(err);
    else    res.render('index', { title: "Cliente excluído!" });
  });
});

module.exports = router;
