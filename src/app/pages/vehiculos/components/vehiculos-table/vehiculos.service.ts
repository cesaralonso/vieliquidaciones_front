import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { VehiculosResponseInterface } from './vehiculos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { VehiculosInterface } from './vehiculos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VehiculosService {

    private actionUrl: string;
    private headers: Headers;


    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    all = () : Observable<VehiculosResponseInterface> => {
           return this._http.get(this.endPoint)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

     findById = ( id ) : Observable<VehiculosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

      create = ( vehiculo: VehiculosInterface ) : Observable<VehiculosResponseInterface> => {
           return this._http.post(this.endPoint, vehiculo, { headers: this.headers })
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

    addVehiculos = (vehiculos: VehiculosInterface): Observable<VehiculosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarVehiculo`;
        const toAdd = JSON.stringify(vehiculos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editVehiculos = (vehiculos: VehiculosInterface): Observable<VehiculosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarVehiculo`;
        const toAdd = JSON.stringify(vehiculos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getVehiculos = (idVehiculo: number): Observable<VehiculosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculosPorIDVehiculo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculo: idVehiculo,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosInterface>response.json())
            .catch(this.handleError);
    }

    getAllVehiculos = (): Observable<VehiculosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <VehiculosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteVehiculos = (id: string): Observable<VehiculosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaVehiculos`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'nicknameauth': credenciales.nicknameauth,
            'usuarioauth': credenciales.usuarioauth,
            'claveauth': credenciales.claveauth,
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarVehiculo = (idVehiculo: number): Observable<VehiculosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarVehiculo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculo: idVehiculo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearVehiculo = (idVehiculo: number): Observable<VehiculosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearVehiculo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculo: idVehiculo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarVehiculo = (idVehiculo: number): Observable<VehiculosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarVehiculo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculo: idVehiculo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarVehiculo = (idVehiculo: number): Observable<VehiculosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarVehiculo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculo: idVehiculo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdVehiculo = (idVehiculo: number, idEstatusVehiculo: number): Observable<VehiculosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDVehiculo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idvehiculo: idVehiculo,
            idestatusvehiculo: idEstatusVehiculo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<VehiculosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<VehiculosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<VehiculosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerVehiculosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<VehiculosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerVehiculosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusVehiculos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusVehiculos`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerRazonesSociales = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerRazonesSociales`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoVehiculos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoVehiculos`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    setFile = (archivo: any): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}AgregarArchivo`;
        const toAdd = JSON.stringify(archivo);

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getFiles = (idreferencia: number, proceso: string): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}ObtenerArchivosPorProcesoPorIdReferencia`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            'nicknameauth': credenciales.nicknameauth,
            'usuarioauth': credenciales.usuarioauth,
            'claveauth': credenciales.claveauth,
            'idreferencia': idreferencia,
            'proceso': proceso
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
