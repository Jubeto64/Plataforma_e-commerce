var express = require('express');
var router = express.Router();

const credential = {
  email: "admin@gmail.com",
  password: "admin123"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res)=>{
  if(req.body.email == credential.email && req.body.password == credential.password){
    //req.session.user = req.body.email;
    console.log('Deu certo');
  }else{
    console.log('Não deu certo');
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
