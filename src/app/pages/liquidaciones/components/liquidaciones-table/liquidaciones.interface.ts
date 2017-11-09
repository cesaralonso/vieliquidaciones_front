export interface LiquidacionesInterface {
  idliquidacion?: number;
  cantidadRecibida: number;
  cambio: number;
  folio: string;
  kilometraje: number;
  fecha: string;
  nota: string;
  cantPagada:number;
  cantDeuda:number;
  status: string;
  bonificado:number;
  chofer_idchofer:number;
}
