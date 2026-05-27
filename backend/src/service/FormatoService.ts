import { randomInt } from "crypto";

export class FormatoService {

    formatearMonto(monto: number): string {
        return new Intl.NumberFormat("es-CO", {
            maximumFractionDigits: 0,
        }).format(monto);
    }

    formatearCuentaDestino(numeroCuenta: string): string {
        return `${numeroCuenta.slice(0, 3)} - ${numeroCuenta.slice(3, 9)} - ${numeroCuenta.slice(9)}`;
    }

    formatearCuentaOrigen(numeroCuenta: string): string {
        return `*${numeroCuenta}`;
    }

    formatearFecha(fecha = new Date()): string {
        const meses = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];

        let horas = fecha.getHours();
        const periodo = horas < 12 ? "a. m." : "p. m.";

        horas = horas % 12 || 12;

        return `${String(fecha.getDate()).padStart(2, "0")} ${meses[fecha.getMonth()]} ${fecha.getFullYear()} - ${horas}:${String(fecha.getMinutes()).padStart(2, "0")} ${periodo}`;
    }

    generarReferencia(): string {
        return `00000${Array.from({ length: 5 }, () => randomInt(0, 10)).join("")}`;
    }
}