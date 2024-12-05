import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/UsuarioCtrl.js";

const usuarioCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", usuarioCtrl.gravar);
rotaUsuario.put("/:codigo", usuarioCtrl.editar);
rotaUsuario.patch("/:codigo", usuarioCtrl.editar);
rotaUsuario.delete("/:codigo", usuarioCtrl.excluir);
rotaUsuario.get("/:codigo", usuarioCtrl.consultar);
rotaUsuario.get("/",usuarioCtrl.consultar);

export default rotaUsuario;