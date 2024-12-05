import Usuario from '../Modelo/usuario.js'
import conectar from './Conexao.js'

export default class UsuarioDAO (){
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario(
                usuario_id INT NOT NULL AUTO_INCREMENT,
                usuario_username VARCHAR(200) NOT NULL,
                usuario_senha VARCHAR(200) NOT NULL,
                usuario_tipo VARCHAR(20) NOT NULL,
                usuario_email VARCHAR(200) NOT NULL,
                CONSTRAINT pk_usuario PRIMARY KEY(usuario_id)
            );
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario(prod_descricao,prod_precoCusto,prod_precoVenda,prod_qtdEstoque,prod_urlImagem,prod_dataValidade,fk_codigo_cat)
                values(?,?,?,?,?,str_to_date(?,'%Y-%m-%d'),?)
            `;
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.categoria.codigo
            ]; //dados do produto
            const resultado = await conexao.execute(sql, parametros);
            produto.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
}