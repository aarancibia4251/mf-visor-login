import {Component, HostListener, OnInit} from '@angular/core';
import {BroadcastService, MsalService} from '@azure/msal-angular';
import {Router} from '@angular/router';
import {concatMap, tap} from 'rxjs/operators';
import {AuditEventService, AuthAdService, LoginService, UserRolService} from '@aarancibia96/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn = false;

  @HostListener('window:storage', ['$event'])
  onStorage(event) {

    // obtenemos todos los keys almacenados en el window.sessionStorage
    const allSession =  { ...window.sessionStorage };

    // REQUEST_FOR_CREDENTIALS: Nos permite escuchar si otro tab hace una solicitud de datos del sessionStorage
    if (event.key === 'REQUEST_FOR_CREDENTIALS' && allSession['msal.idtoken']) {
      window.localStorage.setItem('SHARE_CREDENTIALS', JSON.stringify(allSession));
      window.localStorage.removeItem('SHARE_CREDENTIALS');
    }

    // SHARE_CREDENTIALS: Nos permite escuchar si se nos han proporcionado datos del sessionStorage y se requiere redireccionar,
    // por lo general este evento solo se ejecuta al cargar la página por primera vez y login
    // para solo actualizar el storage se debe usar el evento UPDATE_CREDENTIALS
    if (event.key === 'SHARE_CREDENTIALS' && event.newValue && !allSession['msal.idtoken']) {
      const DATOS = JSON.parse(event.newValue);
      Object.keys(DATOS).forEach((key) => {
        window.sessionStorage.setItem(key, DATOS[key]);
      });
      this.router.navigate(['/home']);
    }

    // UPDATE_CREDENTIALS: Nos permite escuchar si se nos han proporcionado datos del sessionStorage para ser actualizados
    if (event.key === 'UPDATE_CREDENTIALS' && event.newValue) {
      const DATOS = JSON.parse(event.newValue);
      Object.keys(DATOS).forEach((key) => {
        window.sessionStorage.setItem(key, DATOS[key]);
      });
    }

    // CREDENTIALS_FLUSH: Nos permite escuchar si se ha cerrado sesión en otro tab para hacer el logout
    if (event.key === 'CREDENTIALS_FLUSH' && allSession['msal.idtoken']) {
      this.loginSrv.logout();
    }
  }
  constructor(
    private readonly msalService: MsalService,
    private readonly broadcastService: BroadcastService,
    public readonly router: Router,
    private readonly userRolSrv: UserRolService,
    private readonly loginSrv: LoginService,
    private readonly authAdSrv: AuthAdService,
    private readonly auditEventService: AuditEventService,
  ) {
    this.componentDidMount();
  }

  componentDidMount() {
    window.localStorage.setItem('REQUEST_FOR_CREDENTIALS', Date.now().toString());
    window.localStorage.removeItem('REQUEST_FOR_CREDENTIALS');
  }

  ngOnInit() {
    this.msalCheckAccount();
    this.msalRedirect();
    this.msalLoginSuccess();
    this.msalLoginFailure();
  }

  msalCheckAccount(): void {
    this.checkAccount();
    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkAccount();
    });
  }

  checkAccount(): void {
    this.loggedIn = !!this.msalService.getAccount();
  }

  msalRedirect(): void {
    this.msalService.handleRedirectCallback((authError) => {
      if (authError) {
        return;
      }
    });
  }

  msalLoginFailure(): void {
    this.broadcastService.subscribe('msal:loginFailure', (payload) => {
      this.loggedIn = false;
      const auditSearchEvent =
        this.auditEventService
          .createLogSiemRequest('Acceso', 'Failed', 'No se logro iniciar sesión');
      auditSearchEvent.loginLogout = 'Login';
      this.auditEventService.registerLogEvent(auditSearchEvent);
    });
  }

  msalLoginSuccess(): void {
    this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      this.auditEventService.getClientIp().finally();
      const dataIdToken = payload.account.idToken;
      if (this.loginSrv.invalidLogin(dataIdToken)) { // El login es inválido
        this.msalService.logout();
      } else {
        this.authAdSrv.updateAuthToken()
          .pipe(
            concatMap(() => {
              this.loggedIn = false;
              return this.userRolSrv.isVisorRoleValid();
            }),
            tap(resp => {
              this.loginSrv.loginSuccessfull(dataIdToken);
              this.getPermissionByRole(resp);
              this.loginSrv.shareStorageThroughTabs();
            })
          )
          .subscribe();
      }
    });
  }

  getPermissionByRole(rolPermission) {
    sessionStorage.setItem('rol-permission', JSON.stringify(rolPermission));
  }
}
