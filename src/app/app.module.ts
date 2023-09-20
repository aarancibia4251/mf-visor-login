import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import {BroadcastService, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalAngularConfiguration, MsalService} from '@azure/msal-angular';
import {Configuration} from 'msal';
import {msalAngularConfig, msalConfig} from './app-config';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {environment} from '../environments/environment';
import {AuthAdInterceptor, AuthInterceptor} from '@aarancibia96/utils';

export function MSALConfigFactory(): Configuration {
  return msalConfig;
}
export function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return msalAngularConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {
      provide: 'environment', useValue: environment
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthAdInterceptor, multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    },
    MsalService,
    { provide: MSAL_CONFIG, useFactory: MSALConfigFactory },
    { provide: MSAL_CONFIG_ANGULAR, useFactory: MSALAngularConfigFactory },
    BroadcastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
