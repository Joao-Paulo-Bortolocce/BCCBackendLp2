import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/UsuarioCtrl.js";

const usuarioCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", usuarioCtrl.gravar);
rotaUsuario.put("/", usuarioCtrl.editar);
rotaUsuario.patch("/", usuarioCtrl.editar);
rotaUsuario.delete("/:id", usuarioCtrl.excluir);
rotaUsuario.get("/:id", usuarioCtrl.consultar);
rotaUsuario.get("/",usuarioCtrl.consultar);

export default rotaUsuario;