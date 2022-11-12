const express = require("express");
const app = express();

// seleciona o motor de visualizacao
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/pergunta", (req, res) => {
    res.render("pergunta")
})

app.listen(8080, () => {
    console.log("App rodando!");
});