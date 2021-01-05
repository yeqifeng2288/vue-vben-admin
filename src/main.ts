import { createApp } from 'vue';
import App from './App.vue';

import router, { setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { setupAntd } from '/@/setup/ant-design-vue';
import { setupErrorHandle } from '/@/setup/error-handle';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/setup/i18n';
import { setupProdMockServer } from '../mock/_createProductionServer';
import { setApp } from '/@/setup/App';

import { isDevMode, isProdMode, isUseMock } from '/@/utils/env';

import '/@/design/index.less';

import '/@/locales/index';
import { setStartUp } from './startUp';

const app = createApp(App);

// Configure component library
setupAntd(app);

// Multilingual configuration
setupI18n(app);

// Configure routing
setupRouter(app);

// Configure vuex store
setupStore(app);

// Register global directive
setupGlobDirectives(app);

// Configure global error handling
setupErrorHandle(app);

// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true);
});

// The development environment takes effect
if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}

// If you do not need to setting the mock service in the production environment, you can comment the code
if (isProdMode() && isUseMock()) {
  setupProdMockServer();
}

// 启动管理注入。
setStartUp(app);

// Used to share app instances in other modules
setApp(app);
