import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {

    #id;
    #username;
    #email;
    #senha;
    #tipo;

        get id(){
            return this.#id
        }

        set id(value){
            this.#id=value
        }

        get username() {
            return this.#username;
        }
    
        set username(value) {
            this.#username = value;
        }

        get email() {
            return this.#email;
        }
    
        set email(value) {
            this.#email = value;
        }
    
        get senha() {
            return this.#senha;
        }
    
        set senha(value) {
            this.#senha = value;
        }
    
        get tipo() {
            return this.#tipo;
        }
    
        set tipo(value) {
            this.#tipo = value;
        }

        constructor(id=0,username="", senha="", tipo="", email="") {
            this.#id = id;
            this.#username = username;
            this.#email = email;
            this.#senha = senha;
            this.#tipo = tipo;
        }



        toJSON(){
            return {
                "username": this.#username,
                "senha": this.#senha,
                "email": this.#email,
                "tipo": this.#tipo
            }
        }


        async incluir(){
            const usuarioDAO = new UsuarioDAO();
            await usuarioDAO.incluir(this); 
        }
    
        async consultar(termo){
            const usuarioDAO = new UsuarioDAO();
            return await usuarioDAO.consultar(termo);
        }
    
        async excluir(){
            const usuarioDAO = new UsuarioDAO();
            await usuarioDAO.excluir(this);
        }
    
        async alterar(){
            const usuarioDAO = new UsuarioDAO();
            await usuarioDAO.alterar(this);
        }
}