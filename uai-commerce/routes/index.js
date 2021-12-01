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
    if(!e && docs.length > 0){
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
    ADM: 0
  }
  
  if(req.body.cnpj != ''){
    novo_usuario['CNPJ'] = req.body.cnpj;
    novo_usuario['TipoCadastro'] = 'empresa';
    novo_usuario.ADM = 0;
  }else{
    novo_usuario['CPF'] = req.body.cpf;
    novo_usuario['DataNascimento'] = req.body.birthday;
    novo_usuario['TipoCadastro'] = 'pessoal';
  }

  if(req.body.passwordADM == senhaAdmin){
    novo_usuario.ADM = 1;
    novo_usuario['RG'] = req.body.rg;
  }else{
    novo_usuario.ADM = 0;
    novo_usuario['Rua'] = req.body.street;
    novo_usuario['Bairro'] = req.body.district;
    novo_usuario['Numero'] = req.body.number;
    novo_usuario['Complemento'] = req.body.complement;
    novo_usuario['Cidade'] = req.body.city;
    novo_usuario['Estado'] = req.body.state;
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

router.get('/lista_usuarios', function(req, res, next) {
  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  Clientes.find().lean().exec(function (e, docs) {
    if(!e){
      res.render('lista_usuarios', { docs});
    }else{
      console.log('Erro ao carregar a página');
    }
  });
});

router.post('/id_edita_usuario',  function (req, res) {
  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  Clientes.find({_id: req.body.id}).lean().exec(function (e, docs) {
    if(!e && docs.length > 0){
      res.render('edita_usuario', {docs});
    }else{
      console.log('Erro ao fazer login!');
    }
  });
})

router.post('/edita_usuario', function(req, res, next) {
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
  Clientes.updateOne({"_id": req.body.id}, usuario_editado, function (err) {
      if (err)  return console.error(err);
      else{
        Clientes.find(usuario_editado).lean().exec(function (e, docs2) {
          if(!e){
            res.render('home',{ docs: [usuario_logado] });
          }else{
            console.log('Erro ao fazer edição!');
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
