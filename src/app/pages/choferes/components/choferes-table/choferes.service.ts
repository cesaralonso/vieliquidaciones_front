import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { ChoferesResponseInterface } from './choferes-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { ChoferesInterface } from './choferes.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChoferesService {

    private actionUrl: string;
    private headers: Headers;

    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.endPoint = `${this._configuration.ServerWithApiUrl}chofer`;
    }

    all = (): Observable<ChoferesResponseInterface> => {
       return this._http.get(this.endPoint)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }





 findById = ( id ) : Observable<ChoferesResponseInterface> => {
       return this._http.get(`${this.endPoint}/${id}`)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

  create = ( chofer: ChoferesInterface ) : Observable<ChoferesResponseInterface> => {
       return this._http.post(this.endPoint, chofer, { headers: this.headers })
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }

   add = ( choferes: ChoferesInterface ): Observable<ChoferesResponseInterface> =>  {
       return this._http.post(this.endPoint, choferes, { headers: this.headers })
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }


    remove = ( choferId ): Observable<ChoferesResponseInterface> => {
        return this._http.delete(`${this.endPoint}/${choferId}`, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    addChoferes = (choferes: ChoferesInterface): Observable<ChoferesResponseInterface> =>  {
        this.actionUrl = `${this.endPoint}agregarChofer`;
        const toAdd = JSON.stringify(choferes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface>response.json())
            .catch(this.handleError);
    }

    edit = (choferes: ChoferesInterface): Observable<ChoferesResponseInterface> =>  {
        return this._http.patch(this.endPoint, choferes, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    editChoferes = (choferes: ChoferesInterface): Observable<ChoferesResponseInterface> =>  {
        this.actionUrl = `${this.endPoint}modificarChofer`;
        const toAdd = JSON.stringify(choferes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getChoferes = (idChofer: number): Observable<ChoferesInterface> => {
        return this._http.get(this.endPoint)
            .map((response: Response) => <ChoferesInterface>response.json())
            .catch(this.handleError);
    }

    getAllChoferes = (): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerChoferes`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteChoferes = (id: string): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}bajaChoferes`;

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

    autorizarChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}autorizarChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}bloquearChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}cancelarChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarChofer = (idChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}FinalizarChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdChofer = (idChofer: number, idEstatusChofer: number): Observable<ChoferesResponseInterface[]> => {
        this.actionUrl = `${this.endPoint}cambiarEstatusPorIDChofer`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idchofer: idChofer,
            idestatuschofer: idEstatusChofer,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerChoferesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerChoferesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerChoferesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerChoferesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<ChoferesInterface[]> => {
        this.actionUrl = `${this.endPoint}obtenerChoferesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ChoferesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusChoferes = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerEstatusChoferes`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerRazonesSociales = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerRazonesSociales`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoChoferes = (): Observable<any[]> => {
        this.actionUrl = `${this.endPoint}obtenerTipoChoferes`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    setFile = (archivo: any): Observable<any> =>  {
        this.actionUrl = `${this.endPoint}AgregarArchivo`;
        const toAdd = JSON.stringify(archivo);

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getFiles = (idreferencia: number, proceso: string): Observable<any> =>  {
        this.actionUrl = `${this.endPoint}ObtenerArchivosPorProcesoPorIdReferencia`;
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
