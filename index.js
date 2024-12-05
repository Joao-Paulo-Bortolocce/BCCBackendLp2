//instalar um módulo que oferece recursos p/ desenvolver um servidor http
//npm install express

//importar o módulo para ser utilizado em nossa aplicação
//const express = require('express'); commonJS
//vamos utilizar o padrão modular para importar os módulos
//não esqueça de atualizar o arquivo package.json adicionando a chave "type":"module"
import express from 'express';
import rotaProduto from './Rotas/rotaProdutos.js';
import rotaCategoria from "./Rotas/rotaCategorias.js"
import rotaCliente from './Rotas/rotaClientes.js';
import rotaFornecedor from './Rotas/rotaFornecedor.js';
import cors from 'cors';
import dotenv from 'dotenv'
import rotaUsuario from './Rotas/rotaUsuarios.js';

//CARREGAR AS VARIAVEIS DE AMBIENTE LOCALIZADAS NA RAIZ DO PROJETO
// A PARTIR DO ARQUIVO .ENV LOCALIZADO NA RAIZ DO PROJETO
dotenv.config()


const host = "0.0.0.0"; //todas as placas de rede do computador que está executando a aplicação
const porta = 4000;

const app = express(); //aplicação completa HTTP
//prepara a aplicação para processar dados no formato JSON
app.use(express.json());

//configurar a aplicação para responder requisições não importando a origem
app.use(cors({
                "origin":"*",
                "Access-Control-Allow-Origin":'*'
        }));

//app utilize a pasta 'publico' para disponibilizar o conteúdo ali armazenado
app.use(express.static('./publico'));


app.use('/produtos', rotaProduto);
app.use('/categorias',rotaCategoria)
app.use('/clientes',rotaCliente);
app.use('/usuarios', rotaUsuario)
app.use('/fornecedores', rotaFornecedor);
//app.use('/usuarios', rotaUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});