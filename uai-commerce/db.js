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
        ADM: Number,
        Rua: String,
        Bairro: String,
        Numero: String,
        Complemento: String,
        Cidade: String,
        Estado: String,
        TipoCadastro: String,
        CNPJ: String
    },
    {
        collection: 'uaicommerce',
        versionKey: false
    }
); 

module.exports = { Mongoose: mongoose, UserSchema: userSchema }