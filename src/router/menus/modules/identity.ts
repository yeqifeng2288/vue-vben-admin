import { MenuModule } from '../../types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 11000,
  menu: {
    name: t('routes.identity.index'),
    path: '/identity',
    children: [
      {
        path: 'usermanage',
        name: t('routes.identity.usermanage'),
      },
      {
        path: 'rolemanage',
        name: t('routes.identity.rolemanage'),
      },
    ],
  },
};

export default menu;
