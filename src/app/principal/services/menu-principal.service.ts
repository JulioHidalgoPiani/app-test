import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Configuration } from '../../shared/configuration/app.constants';
import { BaseService } from '../../shared/services/base.service';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MenuPrincipalService extends BaseService {
  private urlFarmacia: string;
  private urlGit: string;
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);

  constructor(
    public _httpClient: HttpClient,
    public _configuration: Configuration
  ) {
    super();
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

  public commitsHistory() {
    const options = {
      headers: this.obtenerHeaders(),
    };
    return this._httpClient
      .get(this.urlGit + 'repos/renzorosaz/hackatondona2/commits', options)
      .pipe(catchError(this.handleError));
  }
}
