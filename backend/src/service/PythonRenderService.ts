import { spawn } from "child_process";
import path from "path";

interface RenderData {
  template?: string;
  nombre: string;
  monto: string;
  numeroCuenta: string;
  numeroTuCuenta: string;
  fecha: string;
  referencia: string;
}

export class PythonRenderService {

  render(data: RenderData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(process.cwd(), "python", "render.py");

      const pythonCmd = process.platform === "win32" ? "python" : "python3";

      const python = spawn(pythonCmd, [scriptPath], {
        cwd: process.cwd(),
      });

      const chunks: Buffer[] = [];
      const errors: Buffer[] = [];

      python.stdout.on("data", (chunk) => {
        chunks.push(chunk);
      });

      python.stderr.on("data", (chunk) => {
        errors.push(chunk);
      });

      python.on("error", (error) => {
        reject(error);
      });

      python.on("close", (code) => {
        if (code !== 0) {
          return reject(
            new Error(Buffer.concat(errors).toString() || "Error en Python")
          );
        }

        resolve(Buffer.concat(chunks));
      });

      python.stdin.write(JSON.stringify(data));
      python.stdin.end();
    });
  }
}