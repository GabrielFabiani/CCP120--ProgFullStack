var http = require('http');
var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');
var path = require('path'); // Incluindo o módulo 'path'

//Configurando o Mongo DB
var mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://gabriel_fabiani_admin:Bkb%402021@full-stack.etb8gnz.mongodb.net/?appName=Full-Stack`;
const client = new MongoClient(uri, { useNewUrlParser: true });
//Criando o Banco e a coleção
var dbo = client.db("exemplo_bd");
var usuarios = dbo.collection("usuarios");
//Conexao para os post
var posts = dbo.collection("posts");


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
    
    const {email, senha } = requisicao.body;
    
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



//Aula 09
app.get('/cadastrar_post',function (requisicao, resposta){
    resposta.sendFile(path.join(__dirname, 'public', 'Aula09', 'cadastrar_post.html'));
});

// Rota POST atualizada para usar o MongoDB
app.post('/cadastrar_post', async function (req, res) {
    const { titulo, resumo, conteudo } = req.body;
    const novoPost = { 
        titulo, 
        resumo, 
        conteudo,
        dataCriacao: new Date()
    };

    try {
        await client.connect();
        const dbo = client.db("exemplo_bd");
        const posts = dbo.collection("posts");

        await posts.insertOne(novoPost);

        // Buscar todos os posts para renderizar a listagem
        const listaPosts = await posts.find().sort({ dataCriacao: -1 }).toArray();

        res.render('blog', { posts: listaPosts });
    } catch (erro) {
        console.error("Erro ao inserir post no MongoDB:", erro);
        res.status(500).send("Erro ao cadastrar o post no banco de dados.");
    }
});