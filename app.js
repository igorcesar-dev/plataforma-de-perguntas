const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./db/database");

// database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão do banco: OK!")
    })
    .catch(() => {
        console.log("Conexão do banco: DEU ERRO!")
    })

// seleciona o motor de visualizacao
app.set('view engine', 'ejs');
app.use(express.static('public'))


// configuracao body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// configuracao das rotas
app.get("/", (req, res) => {
    res.render("index")
});

app.get("/pergunta", (req, res) => {
    res.render("pergunta")
})

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send("Formulário Recebido! titulo:" + titulo + " " + " descricao " + descricao);
})

app.listen(8080, () => {
    console.log("App rodando!");
});