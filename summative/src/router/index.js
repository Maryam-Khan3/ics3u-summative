import { createWebHistory, createRouter } from 'vue-router';
import { useStore } from '@/stores';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import DetailView from '../views/DetailView.vue';
import SettingsView from '@/views/SettingsView.vue';
import CartView from '@/views/CartView.vue';
import { userAuthorized } from '@/stores';

const routes = [
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/', component: HomeView },
  { path: '/movies', name: 'movies', component: MoviesView, meta: { requiresAuth: true } },
  { path: '/detailsview/:id', name: 'detail', component: DetailView, meta: { requiresAuth: true } },
  { path: '/settings', name: 'Settings', component: SettingsView, meta: { requiresAuth: true } },
  { path: '/cart', name: 'Cart', component: CartView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  userAuthorized.then(() => {
    const store = useStore();
    if (to.meta.requiresAuth && !store.user) {
      next('/login');
    } else {
      next();
    }
  });
});

export default router;
