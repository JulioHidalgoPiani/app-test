import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public Server_local: string = 'http://localhost:8080/farmacia-core/';
  public Server_git: string = 'https://api.github.com/';
  
  constructor() {}
}
