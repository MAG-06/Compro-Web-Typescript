import type { Request, Response } from "express";
import { ComprobanteService } from "../service/ComprobanteService";
import { TelegramService } from "../service/TelegramService";

export class ComprobanteController {
  private comprobanteService = new ComprobanteService();
  private telegramService = new TelegramService();

  async generar(req: Request, res: Response) {
    try {

      const { nombre, monto, numeroCuenta, numeroTuCuenta, template} = req.body;

      const imagen = await this.comprobanteService.generarImagen(
        nombre,
        Number(monto),
        numeroCuenta,
        numeroTuCuenta,
        template
      );

      await this.telegramService.enviarFoto(imagen);

      return res.json({
        ok: true,
        message: "Imagen generada y enviada a Telegram",
      });

    } catch (error) {

      return res.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : "Error generando imagen",
      });
      
    }
  }
}