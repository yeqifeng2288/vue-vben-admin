import { App, ref } from 'vue';
import { provide } from 'vue';
import { OpenIdConnectService } from './oidc/openIdConnectService';

var oidc = new OpenIdConnectService();
export function setStartUp(app: App<Element>) {
  // provide('OpenIdConnectService', oidc);
}
