import { VerificacionService } from "./VerificacionService";
import { FormatoService } from "./FormatoService";
import { PythonRenderService } from "./PythonRenderService";

export class ComprobanteService {
  private verificacionService: VerificacionService;
  private formatoService: FormatoService;
  private renderer: PythonRenderService;

  constructor() {
    this.verificacionService = new VerificacionService();
    this.formatoService = new FormatoService();
    this.renderer = new PythonRenderService();
  }

  async generarImagen(nombre: string, montoUno: number, numeroCuenta: string, numeroTuCuenta: string, template: string): Promise<Buffer> {
    if (!this.verificacionService.verificarNombre(nombre)) {
      throw new Error("Nombre inválido");
    }

    if (!this.verificacionService.verificarMonto(montoUno)) {
      throw new Error("Monto inválido");
    }

    if (!this.verificacionService.verificarNumeroCuentaDestino(numeroCuenta)) {
      throw new Error("Número de cuenta destino inválido");
    }

    if (!this.verificacionService.verificarNumeroCuentaOrigen(numeroTuCuenta)) {
      throw new Error("Número de cuenta origen inválido");
    }

    if (!template) {
      throw new Error("Número de cuenta origen inválido");
    }

    const monto = this.formatoService.formatearMonto(montoUno);
    const cuentaDestino = this.formatoService.formatearCuentaDestino(numeroCuenta);
    const cuentaOrigen = this.formatoService.formatearCuentaOrigen(numeroTuCuenta);
    const fecha = this.formatoService.formatearFecha();
    const referencia = this.formatoService.generarReferencia();

    return this.renderer.render({
      template,
      nombre,
      monto,
      numeroCuenta: cuentaDestino,
      numeroTuCuenta: cuentaOrigen,
      fecha,
      referencia,
    });
  }
}