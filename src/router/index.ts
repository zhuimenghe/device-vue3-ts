import { createRouter, createWebHashHistory } from 'vue-router';
import { allRoutes } from './routes';


export const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
});

// 路由加载前
// router.beforeEach(async (to, from, next) => {
// });

// // 路由加载后
// router.afterEach(() => {
// });

// 导出路由
export default router;
