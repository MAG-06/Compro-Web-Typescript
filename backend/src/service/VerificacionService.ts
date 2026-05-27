export class VerificacionService {
    verificarNombre(nombre: string): boolean {
        return nombre.trim().length >= 3;
    }

    verificarMonto(monto: number): boolean {
        return Number.isFinite(monto) && monto > 0;
    }

    verificarNumeroCuentaDestino(numeroCuenta: string): boolean {
        return /^\d{11}$/.test(numeroCuenta);
    }

    verificarNumeroCuentaOrigen(numeroCuenta: string): boolean {
        return /^\d{4}$/.test(numeroCuenta);
    }
}