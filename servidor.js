var http = require('http');
var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');
var path = require('path'); // Incluindo o módulo 'path'

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');

const USUARIOS = [{ email: 'admin@site.com', senha: '123' }]; 

var server = http.createServer(app);
server.listen(80);
console.log('Servidor rodando na porta 80...'.rainbow);

//Inicia na página de projects
app.get('/', function (requisicao, resposta){
    resposta.redirect('/projects.html');
});



app.get('/cadastra',function (requisicao, resposta){
    resposta.sendFile(path.join(__dirname, 'public', 'Aula08', 'cadastro.html'));
});


app.post('/cadastra', function (requisicao, resposta) {
    
    const { nomecompleto, email, senha } = requisicao.body;
    
    // Simulação de salvar o usuário
    USUARIOS.push({ email, senha });
    console.log(`Novo Usuário Cadastrado: ${email}`);

    //Redireciona para a página de login quando fazer o cadastro
   resposta.redirect('/login?success=1');
});


app.get('/login',function (requisicao, resposta){
    
    resposta.sendFile(path.join(__dirname, 'public', 'Aula08', 'login.html'));
});


app.post('/login', function (requisicao, resposta) {
   
    const { email, senha } = requisicao.body;

    
    const usuarioEncontrado = USUARIOS.find(user => user.email === email && user.senha === senha);
    
    let status, mensagem,mensagem2;
    if (usuarioEncontrado) {
        status = 'Sucesso no Login!';
        mensagem = `Bem-vindo(a), ${email}!`;
        mensagem2 = 'Coisas boas vem por ai! Aguarde'
    } else {
        status = 'Falha no Login! email e senha não cadastrados!';
        mensagem = 'Email ou senha inválidos. Tente novamente.';
    }

    resposta.render('resposta_cadastro', { status, mensagem,mensagem2 });
});

