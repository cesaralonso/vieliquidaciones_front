import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from 'app/app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RolService {
    private actionUrl: string;
    private headers: Headers;
    private endPoint: string;
    constructor(
        private http: Http,
        private configuration: Configuration,
    ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.endPoint = `${this.configuration.ServerWithApiUrl}rol`;
        
    }

    all = () : Observable<any> => {
        return this.http.get(this.endPoint)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    findById = ( id ) : Observable<any> => {
        return this.http.get(`${this.endPoint}/${id}`)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    create = ( vehiculo ) : Observable<any> => {
        return this.http.post(this.endPoint, vehiculo, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    remove = ( choferId ): Observable<any> => {
        return this.http.delete(`${this.endPoint}/${choferId}`, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    edit = ( vehiculo ): Observable<any> =>  {
        return this.http.patch(this.endPoint, vehiculo, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
