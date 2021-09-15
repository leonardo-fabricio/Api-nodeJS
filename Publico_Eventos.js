const mongoose = require('mongoose');
const PublicoEventos = new mongoose.Schema({
    id_evento: {type: Number},
    id_publico: {type: Number},
},
{
   timestamps: true 
});

mongoose.model('publico_eventos', PublicoEventos);