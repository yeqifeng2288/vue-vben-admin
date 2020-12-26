export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',

  // oidc登录地址。
  BASE_LOGINOIDC = '/login-oidc',

  // oidc登录回调地址。
  BASE_SIGNINOIDC = '/signin-oidc',
  // basic home path
  BASE_HOME = '/home',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/exception/error-log',
}
