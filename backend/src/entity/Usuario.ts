export class Usuario {

    id?: number;
    codigo: string;
    tokens: number;

    constructor(codigo: string, tokens: number, id?: number) {
        this.codigo = codigo;
        this.tokens = tokens;
        this.id = id;
        
    }

    static fromArray(data: any): Usuario {

        return new Usuario(
            data.codigo,
            data.tokens,
            data.id
        );

    }

    toArray() {

        return {
            codigo: this.codigo,
            tokens: this.tokens
        };

    }

}