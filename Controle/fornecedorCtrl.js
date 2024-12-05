import Fornecedor from "../Modelo/fornecedor.js";
import ProdutoDAO from "../Persistencia/produtoDAO.js";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const cnpj = requisicao.body.cnpj;
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const estado = requisicao.body.estado;
            const celular = requisicao.body.celular;
            const telefone = requisicao.body.telefone;
            const cep = requisicao.body.cep;
            const numero = requisicao.body.numero;

            if (cnpj && nome && email && cep && estado && celular && telefone && numero) {


                const fornecedor = new Fornecedor(cnpj, nome, email, cep, estado, celular, telefone, numero);
                fornecedor.consultar(fornecedor.cnpj).then((listaFornecedors)=>{
                    if(listaFornecedors.length===0){

                        fornecedor.incluir()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Fornecedor adicionado com sucesso!",
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                                });
                            });
                    }
                    else{
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "O cnpj informado ja esta cadastrado em outro fornecedor"
                            }
                        );
                    }
                })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const cnpj = requisicao.body.cnpj;
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const estado = requisicao.body.estado;
            const celular = requisicao.body.celular;
            const telefone = requisicao.body.telefone;
            const cep = requisicao.body.cep;
            const numero = requisicao.body.numero;


            if (cnpj && nome && email && cep && estado && celular && telefone && numero) {
                const fornecedor = new Fornecedor(cnpj, nome, email, cep, estado, celular, telefone, numero);
                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json"); 
        if (requisicao.method == 'DELETE') {
            const cnpj = requisicao.params.cnpj;
            if (cnpj) {
                produtoDao = new ProdutoDAO();
                produtoDao.consultarFornecedorInProdutos(cnpj).then((lista)=>{
                    if(lista.length===0){
                        const fornecedor = new Fornecedor(cnpj);
                        fornecedor.excluir()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Fornecedor excluído com sucesso!",
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                                });
                            });

                    }
                    else{
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Este fornecedor está cadastrado em um produto!!"
                            }
                        );
                    }
                })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um fornecedor conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
}

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let cnpj = requisicao.params.cnpj;
            //evitar que código tenha valor undefined
            if (cnpj === undefined) {
                cnpj = "";
            }

            const fornecedor = new Fornecedor();
            fornecedor.consultar(cnpj)
                .then((listaFornecedors) => {
                    resposta.status(200).json(listaFornecedors
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar fornecedors: " + erro.message
                        }
                    );
                });

        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}