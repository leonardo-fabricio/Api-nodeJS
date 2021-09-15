const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GerenciamentoReservas').then(() =>{
    console.log("Conexão estabelecida com banco")
}).catch((erro) => {
    console.log("Error: Conexão não estabelecida")
});

require("./eventos")
require("./publico_eventos")

const eventos = mongoose.model('eventos');
const peventos = mongoose.model('publico_eventos');

app.use(express.json());

//listar eventos
app.get("/listAll", (req, res) => {
    eventos.find({}).then((evento) =>{
        return res.status(200).json(evento); // retornando os eventos
    }).catch((erro) => {
        return res.status(400).json({ 
            error: true,
            message: "Nenhum evento encontrado: ERRO"  + erro
        })
    })
})

app.put("/editar/:id", (req, res) => {
    const evento = eventos.updateOne({_id: req.params.id}, req.body, (err) => { // caso tenha um erro
        if(err) return res.status(400).json({
            error: true,
            message: "Não foi possível editar o evento."
        })
        // se não houver nenhum erro
        return res.json({
            error: false,
            message: "Evento editado com sucesso"
        })
        // não precisa especificar o status(200), se funcionar o status é 200
    })

})

//deletar evento
app.delete("/deletar/:id", (req,res) => { // rota do tipo delete em insomnia
    // irá deletar apenas um 
    const evento = eventos.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Não foi possível excluir o evento"
        })
        return res.json({
            error: false,
            message: "Evento deletado com sucesso"
        })
    })
})

// cadastrar
app.post("/api-evento",(req, res) => {
    const evento =  eventos.create(req.body, (err) => {
        if (err) return res.status(400).json({
                erro : true,
                message: "Erro ao cadastrar o evento"
            });
        return res.status(200).json({
            erro : false,
            message: "Evento salvo com sucesso."
        });
    })
});

// participar de eventos
app.post('/api-publico_eventos', (req, res) => {
    const pevento =  peventos.create(req.body, (err) => {
        if (err) return res.status(400).json({
                erro : true,
                message: "Erro ao cadastrar o evento"
            });
        return res.status(200).json({
            erro : false,
            message: "Evento salvo com sucesso."
        });
    })
});
// listar publico evento
app.get("/listallpe", (req, res) => {
    peventos.find({}).then((pevento) =>{
        return res.status(200).json(pevento);
    }).catch((erro) => {
        return res.status(400).json({ 
            error: true,
            message: "Provavelmente você não está participando de nenhum evento: ERRO " + erro
        })
    })
})

app.delete("/deletarpe/:id", (req,res) => { // rota do tipo delete em insomnia
    // irá deletar apenas um 
    const pevento = peventos.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Não foi possível cancelar participação"
        })
        return res.json({
            error: false,
            message: "Participação cancelada com sucesso."
        })
    })
})
app.listen(3000, () =>{
    console.log("Servidor iniciado")
});