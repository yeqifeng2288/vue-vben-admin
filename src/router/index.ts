import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createGuard } from './guard/';

import { basicRoutes } from './routes/';
import { scrollBehavior } from './scrollBehavior';
import { REDIRECT_NAME } from './constant';

export const useRoute = createWebHistory();

// app router
const router = createRouter({
  history: useRoute,
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: scrollBehavior,
});

// reset router
export function resetRouter() {
  const resetWhiteNameList = [REDIRECT_NAME];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}

// router.onError((error) => {
//   console.error(error);
// });

export default router;
