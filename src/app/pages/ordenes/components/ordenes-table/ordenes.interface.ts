export interface OrdenesInterface {
  idorden?: number;
  fecha: string;
  status: string;
  manoObra: number;
  subtotal: number;
  total: number;
  anticipo: number;
  descripcion: string;
  vehiculoreparando_idvehiculoreparando: number;
  refacciones?: any;
}
