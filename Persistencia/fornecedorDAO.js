import conectar from "./Conexao.js";
import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor (
                cnpj VARCHAR(18) NOT NULL,
                nome VARCHAR(50) NOT NULL,
                email VARCHAR(30) NOT NULL,
                cep VARCHAR(10) NOT NULL,
                estado VARCHAR(20) NOT NULL,
                celular VARCHAR(16) NOT NULL,
                telefone VARCHAR(16) NOT NULL,
                numero INT NOT NULL,
                CONSTRAINT pk_fornecedor PRIMARY KEY (cnpj)
            );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar tabela fornecedor: " + erro.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedor (cnpj, nome, email, cep, estado, celular, telefone, numero)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const parametros = [
                fornecedor.cnpj,
                fornecedor.nome,
                fornecedor.email,
                fornecedor.cep,
                fornecedor.estado,
                fornecedor.celular,
                fornecedor.telefone,
                fornecedor.numero
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedor
                SET nome = ?, email = ?, cep = ?, estado = ?, celular = ?, telefone = ?, numero = ?
                WHERE cnpj like ?;
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.email,
                fornecedor.cep,
                fornecedor.estado,
                fornecedor.celular,
                fornecedor.telefone,
                fornecedor.numero,
                fornecedor.cnpj
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (termo !== undefined && isNaN(parseInt(termo[0]))) {
            sql = `
                SELECT * FROM fornecedor
                WHERE nome LIKE ?;
            `;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `
                SELECT * FROM fornecedor
                WHERE cnpj LIKE ?;
            `;
            parametros = [termo];
        }
        const [linhas] = await conexao.execute(sql, parametros);
        const listaFornecedores = [];
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha['cnpj'],
                linha['nome'],
                linha['email'],
                linha['cep'],
                linha['estado'],
                linha['celular'],
                linha['telefone'],
                linha['numero']
            );
            listaFornecedores.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                DELETE FROM fornecedor
                WHERE cnpj like ?;
            `;
            const parametros = [fornecedor.cnpj];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}
