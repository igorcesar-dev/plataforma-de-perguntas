const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./db/database");
const Pergunta = require("./db/Pergunta");
const Resposta = require("./db/Resposta");

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

app.get("/perguntas", (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(perguntas => {
        res.render("perguntas", {
            perguntas: perguntas
        })
    })
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
})

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { // pergunta encontrada
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else { // pergunta não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

// porta onde o código está rodando
app.listen(8080, () => {
    console.log("App rodando!");
});

