export interface ChoferesInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idchofer?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipochofer: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatuschofer: number;
    observaciones: string;
    desctipochofer?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatuschofer?: string;
    tipochofer?: string;
}
