import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export abstract class BaseService {
  protected obtenerHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Authorization', 'Basic')
    // headers.append('Accept', 'application/vnd.github.v3+json')
    headers.append('Content-Type', 'application/vnd.github.v3+json');
    headers.append('Accept', 'application/vnd.github.v3+json');
    return headers;
  }
}
