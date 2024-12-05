

import { Router } from "express"; 
import ClienteCtrl from "../Controle/clienteCtrl.js";

const clienteCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", clienteCtrl.gravar);
rotaCliente.put("/", clienteCtrl.editar);
rotaCliente.patch("/", clienteCtrl.editar);
rotaCliente.delete("/:cpf", clienteCtrl.excluir);
rotaCliente.get("/:cpf", clienteCtrl.consultar);
rotaCliente.get("/",clienteCtrl.consultar);

export default rotaCliente;


