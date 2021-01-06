import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';
import { t } from '/@/hooks/web/useI18n';

// 给对应的菜单对应app路由。
const identityserver: AppRouteModule = {
  path: '/identityserver',
  name: 'IdentityServer',
  component: LAYOUT,
  redirect: '/identityserver/clientmanage',
  meta: {
    icon: '',
    title: t('routes.identityserver.index'),
  },
  children: [
    {
      path: 'clientmanage',
      name: t('routes.identityserver.clientmanage'),
      component: () => import('/@/views/identityserver/client-manage/ClientManage.vue'),
      meta: {
        title: t('routes.identityserver.clientmanage'),
      },
    },
  ],
};

export default identityserver;
