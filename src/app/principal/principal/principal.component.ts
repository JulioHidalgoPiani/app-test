import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuPrincipalService } from '../services/menu-principal.service';
import { ToastrService } from 'ngx-toastr';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [MenuPrincipalService, DecimalPipe],
})
export class PrincipalComponent implements OnInit {

  // variables
  public commitsList : any[];
  public searchTerm;

  constructor(
    public _router: Router,
    public _menuPrincipalService: MenuPrincipalService,
    public toastr: ToastrService,
  ) {}

  commitsHistory;
  ngOnInit() {
    this.getInicioSesion();
  }

  public getInicioSesion() {
    this._menuPrincipalService.commitsHistory().subscribe((data: any) => {
      if(data.length == 0){
        this.toastr.error('No se pudo obtener los datos', 'Error!',{
          timeOut: 3000,
        });

      }else{
        this.commitsList = data;
        for (var i = 0; i < this.commitsList.length; i++) {
          this.commitsList[i].commit.committer.date = this.commitsList[i].commit.committer.date.substring(0, 10);
        }
        console.log(this.commitsList);
        
        this.toastr.success('Datos obtenidos correctamente', 'OK!',{
          timeOut: 3000,
        });
      }
      console.log(data.length);
    });
  }

}
