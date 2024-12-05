import conectar from "./Conexao.js"
import Cliente from "../Modelo/cliente.js";

export default class ClienteDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS cliente(
                cpf varchar(15) NOT NULL ,
                nome VARCHAR(50) NOT NULL,
                email VARCHAR(30) NOT NULL,
                cep VARCHAR(10) NOT NULL,
                estado VARCHAR(20) NOT NULL,
                celular VARCHAR(16) NOT NULL,
                dataNascimento DATE NOT NULL,
                CONSTRAINT pk_cliente PRIMARY KEY(cpf)
            );
            `
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (erro) {
            console.log("Erro ao iniciar tabela categoria: " + erro.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(cpf,nome,email,cep,estado,celular,dataNascimento)
                values(?,?,?,?,?,?,str_to_date(?,'%Y-%m-%d'))
            `;
            let parametros = [

                cliente.cpf,
                cliente.nome,
                cliente.email,
                cliente.cep,
                cliente.estado,
                cliente.celular,
                cliente.dataNascimento
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET nome = ?,email = ?, cep = ?, estado = ?, celular = ?, dataNascimento = STR_TO_DATE(?, '%Y-%m-%d')
            WHERE cpf = ?;
            `;
            let parametros = [
                cliente.nome,
                cliente.email,
                cliente.cep,
                cliente.estado,
                cliente.celular,
                cliente.dataNascimento,
                cliente.cpf
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }


    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (termo != undefined && isNaN(parseInt(termo[0]))) {
            sql = `SELECT * FROM cliente c
                WHERE c.nome LIKE ?;
                `;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM cliente c
                    WHERE c.cpf LIKE ?;
                    `
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha['cpf'],
                linha['nome'],
                linha['email'],
                linha['cep'],
                linha['estado'],
                linha['celular'],
                linha['dataNascimento']
            );
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf LIKE ?`;
            let parametros = [
                parseInt(cliente.cpf)
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}