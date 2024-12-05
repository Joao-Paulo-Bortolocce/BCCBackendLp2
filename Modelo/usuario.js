

export default class Usuario {

    #id
    #username
    #email
    #senha
    #tipo

        get username() {
            return this._username;
        }
    
        set username(value) {
            this._username = value;
        }

        get email() {
            return this._email;
        }
    
        set email(value) {
            this._email = value;
        }
    
        get senha() {
            return this._senha;
        }
    
        set senha(value) {
            this._senha = value;
        }
    
        get tipo() {
            return this._tipo;
        }
    
        set tipo(value) {
            this._tipo = value;
        }

        constructor(id,username, email, senha, tipo) {
            this.#id = id;
            this.#username = username;
            this.#email = email;
            this.#senha = senha;
            this.#tipo = tipo;
        }

        constructor(username,email,senha,tipo){
            this.#id = 0;
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
            //instanciar a camada de persistencia do produto
            const usuarioDAO = new usuarioDAO();
            await usuarioDAO.incluir(this); //this referência a si mesmo
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