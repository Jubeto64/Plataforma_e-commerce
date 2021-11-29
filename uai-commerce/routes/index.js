var express = require('express');
var router = express.Router();
var db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res)=>{
  let filtro = {Email: req.body.email, Senha: req.body.password}

  var Clientes = db.Mongoose.model('uaicommerce', db.UserSchema, 'uaicommerce');
  Clientes.find(filtro).lean().exec(function (e, docs) {
    //res.render('clientesencontrados', { "clientlist": docs });
    console.log(docs)
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
