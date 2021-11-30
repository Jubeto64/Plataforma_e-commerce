
//Em uma instancia do cmd iniciar o mongo passando o caminho do projeto (o diretorio abaixo é só um exemplo)
mongod --dbpath "C:\Users\jubet\Documents\GitHub\Plataforma_e-commerce\uai-commerce"

//iniciar o cliente mongo (em outra instancia do terminal, manter a instancia anterior ativa tambem)
mongo

//inserir dados no banco
use uai-commerce
info= [
    { "Nome" : "Admin1", "Email": "admin@gmail.com", "Telefone": "12345678", "Senha": "admin123", "CPF" : "12345678901", "RG" : "12345678901", "DataNascimento" : "01-01-01"
    }
]
db.uaicommerce.insert(info);

//Para executar o projeto:
npm start

//Endereço no navegador:
http://localhost:3000/