import ClienteDAO from "../Persistencia/clienteDAO.js";


export default class Cliente {

    #cpf;
    #nome;
    #email;
    #cep;
    #estado;
    #celular;
    #dataNascimento;

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
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

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set dataNascimento(novaDataNascimento) {
        this.#dataNascimento = novaDataNascimento;
    }

    // Construtor para criar um cliente
    constructor(cpf = "", nome = "", email = "", cep = "", estado = "", celular = "", dataNascimento = "") {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#email = email;
        this.#cep = cep;
        this.#estado = estado;
        this.#celular = celular;
        this.#dataNascimento = dataNascimento;
    }

    // Override do método toJSON
    toJSON() {
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "email": this.#email,
            "cep": this.#cep,
            "estado": this.#estado,
            "celular": this.#celular,
            "dataNascimento": this.#dataNascimento
        };
    }

    async incluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.incluir(this);
    }

    async consultar(termo) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(termo);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async alterar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
    }
}
