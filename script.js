// script.js
const mongoose = require('mongoose');
const express = require('express');
const app = express();

function openModal(imgElement) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src; // Define a imagem do modal
    captionText.innerHTML = imgElement.alt; // Define a legenda da imagem
}

function closeModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Modelo do Mongoose
const Contato = mongoose.model("Contato", mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    mensagem: { type: String }
}));

// Função para conectar ao MongoDB
async function conectarAoMongoDB() {
    try {
        await mongoose.connect(`mongodb://PIMaua:<PiMaua>@<hostname>/?ssl=true&replicaSet=atlas-105hv7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
    }
}

// Inicializando o servidor e conectando ao MongoDB
async function startServer() {
    await conectarAoMongoDB();
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}

startServer();

async function criarContato(nome, email, mensagem) {
    const novoContato = new Contato({ nome, email, mensagem });
    try {
        await novoContato.save();
        console.log("Contato salvo com sucesso:", novoContato);
    } catch (error) {
        console.error("Erro ao salvar contato:", error);
    }
}

async function buscarContatos() {
    try {
        const contatos = await Contato.find();
        console.log("Contatos encontrados:", contatos);
        return contatos;
    } catch (error) {
        console.error("Erro ao buscar contatos:", error);
    }
}
async function buscarContatoPorNome(nome) {
    try {
        const contato = await Contato.findOne({ nome });
        console.log("Contato encontrado:", contato);
        return contato;
    } catch (error) {
        console.error("Erro ao buscar contato:", error);
    }
}
async function atualizarContato(nome, novosDados) {
    try {
        const contatoAtualizado = await Contato.findOneAndUpdate({ nome }, novosDados, { new: true });
        console.log("Contato atualizado:", contatoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar contato:", error);
    }
}
async function excluirContato(nome) {
    try {
        const resultado = await Contato.findOneAndDelete({ nome });
        console.log("Contato excluído:", resultado);
    } catch (error) {
        console.error("Erro ao excluir contato:", error);
    }
}

