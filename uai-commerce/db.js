var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/uai-commerce');

var userSchema = new mongoose.Schema(
    {
        Nome: String, 
        Email: String, 
        Telefone: String,
        Senha: String,
        CPF: String,
        RG: String,
        DataNascimento:String,
        ADM: Number
    },
    {
        collection: 'uaicommerce',
        versionKey: false
    }
); 

module.exports = { Mongoose: mongoose, UserSchema: userSchema }