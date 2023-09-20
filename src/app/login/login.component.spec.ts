import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BroadcastService, MsalAngularConfiguration, MsalService, MSAL_CONFIG, MSAL_CONFIG_ANGULAR } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { msalAngularConfig, msalConfig } from '../app-config';

import { LoginComponent } from './login.component';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  function MSALConfigFactory(): Configuration {
    return msalConfig;
  }
  function MSALAngularConfigFactory(): MsalAngularConfiguration {
    return msalAngularConfig;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [MsalService,
        {
          provide: MSAL_CONFIG,
          useValue: MSALConfigFactory(),
        },
        {
          provide: MSAL_CONFIG_ANGULAR,
          useValue: MSALAngularConfigFactory(),
        },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        BroadcastService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
