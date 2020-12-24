import { UserManagerSettings } from 'oidc-client';

// OIDC配置环境。
export const idpBase = 'https://localhost:44396';
export const apiBase = '';
export const reinventAppBase = 'http://localhost:3200';

// 登录环境配置.
export const oidcEnvironment: UserManagerSettings = {
  authority: `${idpBase}`,
  client_id: 'AppCore_Reinvent_App',
  redirect_uri: `${reinventAppBase}/`,
  silent_redirect_uri: `${reinventAppBase}/redirect-silentrenew`,
  scope: `email openid profile role phone address AppCore`,
  response_type: 'id_token token',
  automaticSilentRenew: true,
};
