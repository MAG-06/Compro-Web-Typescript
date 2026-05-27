import { Usuario } from "../entity/Usuario";
import pool from "../config/database";

export class RepositoryUsuario {

    async buscarUsuarioPorCodigo(codigo: string): Promise<Usuario | null> {

        const query = 'SELECT * FROM "Usuarios" WHERE codigo = $1';

        const result = await pool.query(query, [codigo]);

        if (result.rows.length === 0) {
            return null;
        }

        return Usuario.fromArray(result.rows[0]);
    }

    async restarTokens(codigo: string, tokensARestar: number): Promise<boolean> {

        const query = `
        UPDATE "Usuarios"
        SET tokens = tokens - $1
        WHERE codigo = $2
        AND tokens >= $1
    `;

        const result = await pool.query(query, [
            tokensARestar,
            codigo
        ]);

        return result.rowCount !== 0;

    }


}