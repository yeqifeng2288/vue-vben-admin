import { MenuModule } from '../../types';
import { t } from '/@/hooks/web/useI18n';

// 此文件定义菜单的名称和访问路径。
const menu: MenuModule = {
  orderNo: 50,
  menu: {
    // 从i18nn中获取配置名称
    name: t('routes.identityserver.manage'),
    path: '/identityserver/manage',
  },
};

export default menu;
