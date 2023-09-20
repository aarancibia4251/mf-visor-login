import { Configuration } from 'msal';
import { MsalAngularConfiguration } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

// this checks if the app is running on IE
export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const b2cPolicies = environment.b2c.policies;

export const apiConfig: { b2cScopes: string[], webApi: string } = environment.b2c.apiConfig;

export const msalConfig: Configuration = {
  auth: {
    clientId: b2cPolicies.authorities.signUpSignIn.clientId,
    redirectUri: b2cPolicies.authorities.signUpSignIn.redirectUri,
    postLogoutRedirectUri: b2cPolicies.authorities.signUpSignIn.postLogoutRedirectUri,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    navigateToLoginRequestUrl: true,
    validateAuthority: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: isIE,
  },
};

export const loginRequest: { scopes: string[] } = {
  scopes: [
    'openid',
    'profile'
  ],
};

export const tokenRequest: { scopes: string[] } = {
  scopes: apiConfig.b2cScopes
};

export const protectedResourceMap: [string, string[]][] = [
  [
    apiConfig.webApi,
    apiConfig.b2cScopes
  ]
];

export const msalAngularConfig: MsalAngularConfiguration = {
  protectedResourceMap, // API calls to these coordinates will activate MSALGuard
  popUp: !isIE,
  consentScopes: [
    ...loginRequest.scopes,
    ...tokenRequest.scopes,
  ],
  unprotectedResources: [], // API calls to these coordinates will NOT activate MSALGuard
  extraQueryParameters: {
    prompt: 'login'
  }
};
