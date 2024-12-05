

import { Router } from "express"; 
import FornecedorCtrl from "../Controle/fornecedorCtrl.js";

const fornecedorCtrl = new FornecedorCtrl();
const rotaFornecedor = Router();

rotaFornecedor.post("/", fornecedorCtrl.gravar);
rotaFornecedor.put("/", fornecedorCtrl.editar);
rotaFornecedor.patch("/", fornecedorCtrl.editar);
rotaFornecedor.delete("/:cnpj", fornecedorCtrl.excluir);
rotaFornecedor.get("/:cnpj", fornecedorCtrl.consultar);
rotaFornecedor.get("/",fornecedorCtrl.consultar);

export default rotaFornecedor;


