import { Usuario } from "../entity/Usuario.js";
import { RepositoryUsuario } from "../repository/RepositoryUsuario";

export class UsuarioService {

    private repositoryUsuario: RepositoryUsuario;

    constructor() {
        this.repositoryUsuario = new RepositoryUsuario();
    }

    async buscarUsuarioPorCodigo(codigo: string): Promise<Usuario> {

        if (!codigo || codigo.trim() === "") {
            throw new Error("El código del usuario es obligatorio");
        }

        const usuario = await this.repositoryUsuario.buscarUsuarioPorCodigo(codigo);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        return usuario;
    }

    async restarTokens(codigo: string, tokensARestar: number): Promise<boolean> {

        if (!codigo || codigo.trim() === "") {
            throw new Error("El código del usuario es obligatorio");
        }

        if (tokensARestar <= 0) {
            throw new Error("La cantidad de tokens a restar debe ser mayor a 0");
        }

        const usuario = await this.repositoryUsuario.buscarUsuarioPorCodigo(codigo);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        if (usuario.tokens < tokensARestar) {
            throw new Error("El usuario no tiene tokens suficientes");
        }

        const resultado = await this.repositoryUsuario.restarTokens(codigo, tokensARestar);

        if (!resultado) {
            throw new Error("No se pudieron restar los tokens");
        }

        return true;
    }

}