import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: MsalService
  ) { }

  ngOnInit(): void { }

   login() {
    // Implementamos extraQueryParameters, prompt: 'login' para forzar la solicitud del login,
    // esto es necesario cuando la sesión es cerrada de manera forzada al limpiar el storage
    this.authService.loginRedirect({ extraQueryParameters: { prompt: 'login' } });
  }

}
