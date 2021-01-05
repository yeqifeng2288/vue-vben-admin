import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';
import { t } from '/@/hooks/web/useI18n';

// 给对应的菜单对应app路由。
const identityserver: AppRouteModule = {
  path: '/identityserver',
  name: 'IdentityServer',
  component: LAYOUT,
  children: [],
  redirect: '/identityserver/manage',
  meta: {
    icon: '',
    title: t('routes.identityserver.manage'),
  },
};

export default identityserver;
