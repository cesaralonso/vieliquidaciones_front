import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { ConceptosResponseInterface } from './conceptos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { ConceptosInterface } from './conceptos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConceptosService {

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

    addConceptos = (conceptos: ConceptosInterface): Observable<ConceptosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarConcepto`;
        const toAdd = JSON.stringify(conceptos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editConceptos = (conceptos: ConceptosInterface): Observable<ConceptosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarConcepto`;
        const toAdd = JSON.stringify(conceptos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getConceptos = (idConcepto: number): Observable<ConceptosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerConceptosPorIDConcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idconcepto: idConcepto,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosInterface>response.json())
            .catch(this.handleError);
    }

    getAllConceptos = (): Observable<ConceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerConceptos`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <ConceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteConceptos = (id: string): Observable<ConceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaConceptos`;
       
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

    autorizarConcepto = (idConcepto: number): Observable<ConceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarConcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idconcepto: idConcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearConcepto = (idConcepto: number): Observable<ConceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearConcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idconcepto: idConcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarConcepto = (idConcepto: number): Observable<ConceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarConcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idconcepto: idConcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarConcepto = (idConcepto: number): Observable<ConceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarConcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idconcepto: idConcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdConcepto = (idConcepto: number, idEstatusConcepto: number): Observable<ConceptosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDConcepto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idconcepto: idConcepto,
            idestatusconcepto: idEstatusConcepto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerConceptosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<ConceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerConceptosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerConceptosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<ConceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerConceptosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerConceptosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<ConceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerConceptosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerConceptosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<ConceptosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerConceptosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            nicknameauth: credenciales.nicknameauth,
            usuarioauth: credenciales.usuarioauth,
            claveauth: credenciales.claveauth,
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ConceptosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusConceptos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusConceptos`;
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

    obtenerTipoConceptos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoConceptos`;
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
