import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    
    #cnpj;
    #nome;
    #email;
    #cep;
    #estado;
    #celular;
    #telefone;
    #numero;

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    get celular() {
        return this.#celular;
    }

    set celular(novoCelular) {
        this.#celular = novoCelular;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get numero() {
        return this.#numero;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    // Construtor para criar um fornecedor
    constructor(cnpj = "", nome = "", email = "", cep = "", estado = "", celular = "", telefone = "", numero = "") {
        this.#cnpj = cnpj;
        this.#nome = nome;
        this.#email = email;
        this.#cep = cep;
        this.#estado = estado;
        this.#celular = celular;
        this.#telefone = telefone;
        this.#numero = numero;
    }

    // Override do método toJSON
    toJSON() {
        return {
            "cnpj": this.#cnpj,
            "nome": this.#nome,
            "email": this.#email,
            "cep": this.#cep,
            "estado": this.#estado,
            "celular": this.#celular,
            "telefone": this.#telefone,
            "numero": this.#numero
        };
    }


    async incluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.incluir(this);
    }

    async consultar(termo) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(termo);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async alterar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.alterar(this);
    }
}
