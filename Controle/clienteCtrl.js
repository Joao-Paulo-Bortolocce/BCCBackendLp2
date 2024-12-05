import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const cpf = requisicao.body.cpf;
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const cep = requisicao.body.cep;
            const estado = requisicao.body.estado;
            const celular = requisicao.body.celular;
            const dataNascimento = requisicao.body.dataNascimento;

            if (cpf && nome && email && cep && estado && celular && dataNascimento) {


                const cliente = new Cliente(cpf, nome, email, cep, estado, celular, dataNascimento);
                cliente.consultar(cliente.cpf).then((listaClientes)=>{
                    if(listaClientes.length===0){

                        cliente.incluir()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Cliente adicionado com sucesso!",
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível incluir o cliente: " + erro.message
                                });
                            });
                    }
                    else{
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "O CPF informado ja esta cadastrado em outro cliente"
                            }
                        );
                    }
                })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
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
            const cpf = requisicao.body.cpf;
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const cep = requisicao.body.cep;
            const estado = requisicao.body.estado;
            const celular = requisicao.body.celular;
            const dataNascimento = requisicao.body.dataNascimento.substr(0,10);

            if (cpf && nome && email && cep && estado && celular && dataNascimento) {
                const cliente = new Cliente(cpf, nome, email, cep, estado, celular, dataNascimento);

                cliente.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
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
            const cpf = requisicao.params.cpf;
            if (cpf) {
                //alterar o cliente
                const cliente = new Cliente(cpf);
                cliente.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um cliente conforme documentação da API."
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
            let cpf = requisicao.params.cpf;
            //evitar que código tenha valor undefined
            if (cpf === undefined) {
                cpf = "";
            }

            const cliente = new Cliente();
            cliente.consultar(cpf)
                .then((listaClientes) => {
                    resposta.status(200).json(listaClientes
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar clientes: " + erro.message
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