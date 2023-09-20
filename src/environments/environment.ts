// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from '@aarancibia96/utils';

export const environment = {
  production: false,
  environment: 'local',
  logger: true,
  apiCutestMovistar: {
    baseUrl: 'https://api.cutest.movistar.com.pe/',
    servicePath: {
      passwordDetails: 'api-ne-uniquepassword-password-oc/v1/password/details',
    },
    ocpKey: '60dd848b85824190a3642d6daea0af1b'
  },
  apimanagementAzure: {
    baseUrl: 'https://apimngr-genesis-cert.azure-api.net',
    servicePath: {
      auth: 'auth',
      userRol: 'user-rol/usersandroles/v1/role',
      auditLogSiem: 'user-auditoria/v1/logsiem',
    },
    ocpKey: 'caa80390fcd14eddb4fec1013ec7f201',
  },
  APPLICATION_TOKEN: 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJpc3MiOiAiSldULUdlbmVyYXRvciBDb0UgVEkiLCAiaWF0IjogIjE2NzAyNzUyNDMiLCJleHAiOiAiMTcwMTgxMTI0MyIsICJhdWQiOiAiaHR0cHM6Ly9hcGltbmdyLWdlbmVzaXMtY2VydC5henVyZS1hcGkubmV0IiwgInN1YiI6ICJicnlhbi5qdWxjYUB0ZWxlZm9uaWNhLmNvbSIsICAiY2xpZW50X2lkIjogIjdjNmI0OTM4LTU5YTQtNDgwOS1iZjY2LWIzNGY1OTFiNDZkNSIsICAic2VjcmV0X2lkIjogIkJuYjdRfmtaQmZCb3dCQ3N4c3RwNkNnM0lKM0VVb3hjX3JrVXgiLCAgInRlbmFudCI6ICI5Mjk2MTZmZi04MThjLTQ1NDEtYjA3MS0yYmQ2YWI5MTJlODgifQ.32pVp-Wy_K3ipDqQqAkR-Ngdqud2DyzkGSKiF_ZefAo',
  apimanagementOnpremise: {
    baseUrl: 'https://apisd10.telefonica.com.pe',
    servicePath: {
      externalAdToken: 'testing/bss/public1/oauth2/token',
      internalAdToken: 'testing/bss/public2/oauth2/token',
      token: 'testing/bss/public/oauth2/token',
    },
    client_id: '3f6603c24864b0e25782d2ad8c8d2c4a',
    client_secret: 'bb319a6c3629ccb05122b9671b0c87f0',
    scope: 'usuario seguridad'
  },
  apimanagementOnpremiseV2: {
    baseUrl: 'https://apisd10.telefonica.com.pe',
    servicePath: {
      baseURLBssd: 'testing/bss',
    },
    client_id: '3f6603c24864b0e25782d2ad8c8d2c4a'
  },
  backendTrazabilidadProvision: {
    baseUrl: 'https://apimngr-genesis-cert.azure-api.net/api-ne-provisioning-trazaprovision-oc/v1',
    servicePath: {
      basePathContractedByCustomer: 'provision/aftersales/services-contracted-by-customer',
    },
  },

  backendTrazabilidadAgendamiento: {
    baseUrl: 'https://apimngr-genesis-cert.azure-api.net/api-ne-externos-trazagendamiento-oc/v1',
    servicePath: {
      basePathAvailabilityTechnicalAppointment: 'schedule/aftersales/availability-technical-appointment',
      basePathScheduleTechnicalAppointments: 'schedule/aftersales/schedule-technical-appointments',
    },
  },
  /*****************************************************
   b2c
   *****************************************************/
  b2c: {
    policies: {
      names: {
        signUpSignIn: 'B2C_1A_LoginVisor',
      },
      authorities: {
        signUpSignIn: {
          authority: 'https://telefonicaperub2cdev.b2clogin.com/telefonicaperub2cdev.onmicrosoft.com/B2C_1A_LoginVisor',
          clientId: '60e6877e-5b2b-4326-9037-40f8dbca2d21',
          redirectUri: 'http://localhost:9000',
          postLogoutRedirectUri: 'http://localhost:9000',
        }
      }
    },
    apiConfig: {
      b2cScopes: [
        'https://tdppocb2c.onmicrosoft.com/telefonica'
      ],
      webApi: 'http://localhost:9000'
    }
  },
} as Environment;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
