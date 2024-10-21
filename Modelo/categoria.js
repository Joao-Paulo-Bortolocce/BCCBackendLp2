import CategoriaDAO from "../Persistencia/categoriaDao.js";

export default class Categoria {
    // Atributos privados usando "#"
    #codigo;
    #descricao;
    constructor(codigo, descricao) {
      this.#codigo = codigo;
      this.#descricao = descricao;
    }
    // Getter para o código
    get codigo() {
      return this.#codigo;
    }
    // Setter para o código
    set codigo(valor) {
      this.#codigo = valor;
    }
    // Getter para a descrição
    get descricao() {
      return this.#descricao;
    }
    // Setter para a descrição
    set descricao(valor) {
      this.#descricao = valor;
    }
    // Método para converter a categoria para JSON
    toJSON() {
      return {
        codigo: this.#codigo,
        descricao: this.#descricao
      };
    }

    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this)
    }
    
    async editar(){
        const catDAO = new CategoriaDAO();
        await catDAO.editar(this)
    }

    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this)
    }
    async consultar(termo){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(termo)
    }

  }