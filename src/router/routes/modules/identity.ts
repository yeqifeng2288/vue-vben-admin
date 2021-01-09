import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';
import { t } from '/@/hooks/web/useI18n';
const identity: AppRouteModule = {
  path: '/identity',
  name: 'Identity',
  component: LAYOUT,
  redirect: '/identity/usermanage',
  meta: {
    icon: 'carbon:user-role',
    title: t('routes.identity.index'),
  },
  children: [
    {
      path: 'usermanage',
      name: t('routes.identity.usermanage'),
      component: () => import('/@/views/identity/usermanage/UserManage.vue'),
      meta: {
        title: t('routes.identity.usermanage'),
      },
    },
    {
      path: 'rolemanage',
      name: t('routes.identity.rolemanage'),
      component: () => import('/@/views/identity/rolemanage/RoleManage.vue'),
      meta: {
        title: t('routes.identity.rolemanage'),
      },
    },
  ],
};

export default identity;
