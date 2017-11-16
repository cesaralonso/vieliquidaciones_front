export interface OrdenesInterface {
  idorden?: number;
  fecha: string;
  status: string;
  manoObra: number;
  subtotal: number;
  total: number;
  anticipo: number;
  vehiculoreparando_idvehiculoreparando: number;
  refacciones?: any;
  servicios?: any;
}
