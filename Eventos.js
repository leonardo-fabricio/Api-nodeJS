const mongoose = require('mongoose');
const Eventos = new mongoose.Schema({
    titulo :{
        type : String,
        required : true
    },
    descricao:{
        type : String,
        required : true
    },
    qtdPessoas:{
        type: Number,
        required : true
    },
    dataEvento:{
        type:String,
        required : true
    },
    horaInicial:{
        type:String,
        required : true
    },
    horaFinal:{
        type:String,
        required : true
    },
    local:{
        type:String,
        required : true
    },
    id_estabelecimento:{
        type:Number,
    },
    id_auxiliar:{
        type:Number,
    },
    qtd_auxiliar:{
        type:Number,
    }
},
{
   timestamps: true 
});

mongoose.model('eventos', Eventos);