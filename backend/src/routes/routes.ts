import { Router } from "express";
import { ComprobanteController } from "../controller/ComprobanteController";
import { UsuarioController } from "../controller/UsuarioController";

const router = Router();
const comprobanteController = new ComprobanteController();
const usuarioController = new UsuarioController();

router.post(
  "/generar-imagen",
  comprobanteController.generar.bind(comprobanteController)
);

router.get(
  "/usuario/:codigo",
  usuarioController.buscarUsuario.bind(usuarioController)
);

router.post(
  "/usuario/restarTokens",
  usuarioController.restarTokens.bind(usuarioController)
);

export default router;