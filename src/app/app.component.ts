import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public id;
  constructor( public _router: Router, public _route: ActivatedRoute) {
    //  this.toastr.setRootViewContainerRef(vRef);

      this._router.navigate(['principal']);
    
  }
  ngOnInit() {

  }
}