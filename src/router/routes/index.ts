import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '../constant';

import modules from 'globby!/@/router/routes/modules/**/*.@(ts)';
import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';

import { t } from '/@/hooks/web/useI18n';

import SigninOidc from '/@/views/sys/login/SigninOidc.vue';
import LoginOidc from '/@/views/sys/login/LoginOidc.vue';

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = Array.isArray(modules[key]) ? [...modules[key]] : [modules[key]];
  routeModuleList.push(...mod);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const LoginOidcRoute: AppRouteRecordRaw = {
  path: '/login-oidc',
  name: 'LoginOidc',
  component: LoginOidc,
  meta: {
    title: t('routes.basic.login'),
  },
};

export const SiginOidcRoute: AppRouteRecordRaw = {
  path: '/signin-oidc',
  name: 'SigninOidc',
  component: SigninOidc,
  meta: {
    title: t('routes.basic.siginoidc'),
  },
};

// 基础路由 不用权限
export const basicRoutes = [
  SiginOidcRoute,
  LoginOidcRoute,
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
];
