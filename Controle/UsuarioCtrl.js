
import Usuario from "../Modelo/usuario.js"
export default class ProdutoCtrl {

    gravar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const username = requisicao.body.username;
            const senha = requisicao.body.senha;
            const tipo = requisicao.body.tipo;
            const email = requisicao.body.email;
            if (username && senha &&
                tipo && email) {
                const usuario = new Usuario(0,
                    username, senha, tipo,
                    email);

                usuario.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuario adicionado com sucesso!",
                            "id": usuario.id
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o usuario: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um usuario conforme documentação da API."
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
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            //o código será extraída da URL (padrão REST)
            const id = requisicao.body.id;
            const username = requisicao.body.username;
            const senha = requisicao.body.senha;
            const tipo = requisicao.body.tipo;
            const email = requisicao.body.email;
            if (id >= 0 && username && senha &&
                tipo && email) {
                const usuario = new Usuario(id,
                    username, senha, tipo,
                    email);
                usuario.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuario alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o usuario: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um usuario conforme documentação da API."
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
            const id = requisicao.params.id;
            if (id >= 0) {
                const usuario = new Usuario(id);
                usuario.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuario excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o usuario: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um usuario conforme documentação da API."
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
            let id = requisicao.params.id;
            //evitar que código tenha valor undefined
            if (isNaN(id)) {
                id = "";
            }

            const usuario = new Usuario();
            //método consultar retorna uma lista de produtos
            usuario.consultar(id)
                .then(([listaDeUsuarios,listaDeIds]) => {
                    
                    resposta.status(200).json(
                        {
                            "listaDeUsuarios": listaDeUsuarios,
                            "listaDeIds": listaDeIds
                        }
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar usuarios: " + erro.message
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