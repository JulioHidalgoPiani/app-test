import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public Server_git: string = 'https://api.github.com/';
  
  constructor() {}
}
