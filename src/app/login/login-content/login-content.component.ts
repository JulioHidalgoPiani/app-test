import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss'],
  providers: [LoginService],
})
export class LoginContentComponent implements OnInit {
  public confirmacionID;
  public Param = { username: '', password: '' };

  constructor(public _router: Router, public _loginService: LoginService, private route: ActivatedRoute,) {}
  ngOnInit() {}
  name = "";

  public timeoutPromise(time: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Date.now());
      }, time);
    });
  }

  public iniciarSession() {
    // let p = btoa(this.Param.username + this.Param.password);
    // this.Param.username = btoa(this.Param.username);
    // this.Param.password = btoa(this.Param.password);
    console.log("hol");
    this._router.navigate(['principal']);
    // this._loginService.inicioSesionGithub(this.Param).subscribe((data: any) => {
    //   if (data.message == 'Bad credentials') {
    //     // this.toastr.error("wrong Credentials")
    //     this._router.navigate(['principal']);
    //   } else {
    //     // this.toastr.success("Logueado");
    //     console.log(data);
    //     this._router.navigate(['principal']);
    //   }
    // });
  }

  // public getInicioSesion() {
  //   this._loginService.inicioSesionAPI(this.Param).subscribe((data: any) => {
  //     if (data.estado == 1) {
  //       this.confirmacionID = data.confirmacionID;
  //       if (this.confirmacionID.idResult == 0) {
  //         this.toastr.error(data.confirmacionID.mensaje, '', {
  //           timeOut: 3000,
  //         });
  //       }
  //     } else {
  //       this.toastr.error('data.confirmacionID.mensaje', '', {
  //         timeOut: 3000,
  //       });
  //     }
  //   });
  // }
}
