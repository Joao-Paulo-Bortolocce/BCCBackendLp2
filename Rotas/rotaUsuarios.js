import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/UsuarioCtrl.js";

const usuarioCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaProduto.post("/", usuarioCtrl.gravar);
rotaProduto.put("/:codigo", usuarioCtrl.editar);
rotaProduto.patch("/:codigo", usuarioCtrl.editar);
rotaProduto.delete("/:codigo", usuarioCtrl.excluir);
rotaProduto.get("/:codigo", usuarioCtrl.consultar);
rotaProduto.get("/",usuarioCtrl.consultar);

export default rotaUsuario;