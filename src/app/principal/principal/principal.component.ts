import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuPrincipalService } from '../services/menu-principal.service';
import { ToastrService } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [MenuPrincipalService, DecimalPipe],
})
export class PrincipalComponent implements OnInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;


  //tabla
  displayedColumns = [
    'id',
    'mensaje',
    'persona',
    'email',
    'fecha',
    'detalle'
  ];
  dataSource = new MatTableDataSource();

  // variables
  public commitsList: any[];
  public displayedSize: number[];
  public pageSize: number;
  public pagination: any;
  public totalRecords : number;

  constructor(
    public _router: Router,
    public _menuPrincipalService: MenuPrincipalService,
    public toastr: ToastrService
  ) {
    //paginación
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [3, 6, 9, 15];
    this.pageSize = this.displayedSize[0];
  }

  ngOnInit() {
    this.getCommitHistory();
  }

  public pageEvent($event: any) {
    this.pagination.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getCommitHistory();
  }

  /**
   * @author Julio Hidalgo Piani
   * @description Obtiene la lista de historial de commits.
   */
  public getCommitHistory(numPagina?: number) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    this._menuPrincipalService.commitsHistory().subscribe((data: any) => {
      if (data.length == 0) {
        this.toastr.error('No se pudo obtener los datos', 'Error!', {
          timeOut: 3000,
        });
      } else {
        
        this.commitsList = data;
        this.totalRecords = data.length;

        let count = 1;
        console.log(this.totalRecords);
        this.commitsList.forEach((element) => {
          element['index'] = count;
          count++;
        });

        for (var i = 0; i < this.commitsList.length; i++) {
          this.commitsList[i].commit.committer.date =
            this.commitsList[i].commit.committer.date.substring(0, 10) +
            '-' +
            this.commitsList[i].commit.committer.date.substring(11, 19);
        }
        this.dataSource = new MatTableDataSource(this.commitsList);
        if (this.matPaginator) {
          this.matPaginator.pageIndex = numPagina
            ? numPagina - 1
            : this.matPaginator.pageIndex;
        }

        if (this.commitsList.length > 0) {
          this.pagination.numMostrarPagina = this.totalRecords;
        }

        this.toastr.success('Datos obtenidos correctamente', 'OK!', {
          timeOut: 3000,
        });
      }
    });
  }
}
