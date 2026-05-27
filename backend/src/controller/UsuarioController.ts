import type { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

export class UsuarioController {

    private serviceUsuario = new UsuarioService();

    async buscarUsuario(req: Request, res: Response) {

        try {

            const  codigo  = String(req.params.codigo);

            const usuario = await this.serviceUsuario.buscarUsuarioPorCodigo(codigo);

            return res.json({
                ok: true,
                usuario
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                error: error instanceof Error
                    ? error.message
                    : "Error buscando usuario"
            });

        }

    }

    async restarTokens(req: Request, res: Response) {

        try {

            const { codigo, tokens } = req.body;

            const resultado = await this.serviceUsuario.restarTokens(
                codigo,
                Number(tokens)
            );

            return res.json({
                ok: true,
                message: "Tokens restados correctamente",
                resultado
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                error: error instanceof Error
                    ? error.message
                    : "Error restando tokens"
            });

        }

    }

}