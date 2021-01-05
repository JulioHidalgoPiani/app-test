import { Component, OnInit, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Configuration } from './../../shared/configuration/app.constants';
import { BaseService } from './../../shared/services/base.service';
import { ThrowStmt } from '@angular/compiler';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class LoginService extends BaseService {
  public urlFarmacia: string;
  public urlGit: string;

  constructor(
    public _httpClient: HttpClient,
    public _configuration: Configuration
  ) {
    super();
    this.urlFarmacia = this._configuration.Server_local;
    this.urlGit = this._configuration.Server_git;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

   public inicioSesionGithub(Params) {


  
    let queryParams: URLSearchParams = new URLSearchParams();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/vnd.github.v3+json');
    headers = headers.set('Accept', 'application/vnd.github.v3+json');
    // headers.append('Authorization', 'Basic ' + auth);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    // headers = headers.set("Authorization": "Basic ");
    if (Params.username) {
      queryParams.append('username', Params.username);
      console.log('service', Params.username);
    }
    if (Params.password) {
      queryParams.append('password', Params.password);
      console.log('service', Params.password);
    }
    let auth = btoa(Params.username + ':' + Params.password);
    const options = {
      headers: headers,
      search: queryParams,
    };
    return  this._httpClient 
      .get(this.urlGit + 'user', {
        headers: {
          'Authorization': 'Basic ' + auth, "Accept" : "application/vnd.github.v3+json",
        },
      })
      .pipe(catchError(this.handleError));
  }

  // public inicioSesionAPI(Params) {
  //   let queryParams: URLSearchParams = new URLSearchParams();

  //   if (Params.email) {
  //     queryParams.append('email', Params.email);
  //     console.log('service', Params.email);
  //   }
  //   if (Params.email) {
  //     queryParams.append('contrasena', Params.contrasena);
  //     console.log('service', Params.contrasena);
  //   }

  //   const options = {
  //     headers: this.obtenerHeaders(),
  //     search: queryParams,
  //   };
  //   return this._httpClient
  //     .get(
  //       this.urlFarmacia +
  //         'Persona/iniciarSesion?contrasena=' +
  //         Params.contrasena +
  //         '&email=' +
  //         Params.email,
  //       options
  //     )
  //     .pipe(catchError(this.handleError));
  // }
}
