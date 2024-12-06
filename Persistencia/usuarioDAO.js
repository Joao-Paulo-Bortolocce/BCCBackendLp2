import Usuario from '../Modelo/usuario.js'
import conectar from './Conexao.js'

export default class UsuarioDAO {
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
            const sql = `INSERT INTO usuario(usuario_username,usuario_senha,usuario_tipo,usuario_email)
                values(?,?,?,?)
            `;
            let parametros = [
                usuario.username,
                usuario.senha,
                usuario.tipo,
                usuario.email
            ]; 
            const resultado = await conexao.execute(sql, parametros);
            usuario.id = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET usuario_username=?,usuario_senha=?,usuario_tipo=?,usuario_email=?
                WHERE usuario_id = ?
            `;
            let parametros = [
                usuario.username,
                usuario.senha,
                usuario.tipo,
                usuario.email,
                usuario.id
            ]; //dados do usuario
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if(isNaN(parseInt(termo))){
            sql = `SELECT * FROM usuario 
            WHERE usuario_username like ?;
            `;
            parametros = ['%' + termo + '%'];
        }
        else{
            sql = `SELECT * FROM usuario 
            WHERE usuario_id = ?;
            `;
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaUsuarios = [];
        let listaDeIds = [];
        for (const linha of linhas) {
            const usuario = new Usuario(
                linha['usuario_id'],
                linha['usuario_username'],
                linha['usuario_senha'],
                linha['usuario_tipo'],
                linha['usuario_email']
            );
            listaUsuarios.push(usuario);
            listaDeIds.push(usuario.id)
        }
        await conexao.release();
        return [listaUsuarios,listaDeIds];
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE usuario_id = ?`;
            let parametros = [
                parseInt(usuario.id)
            ]; 
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão

        }
    }

}