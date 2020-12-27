import { App, ref } from 'vue';
import { provide } from 'vue';
import { OpenIdConnectService } from '/@/modules/sys/login/openIdConnectService';

var oidc = new OpenIdConnectService();
export function setStartUp(app: App<Element>) {
  // provide('OpenIdConnectService', oidc);
}
