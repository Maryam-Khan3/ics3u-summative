import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import DetailView from '../views/DetailView.vue';
import SettingsView from '../../../ics3u/src/views/SettingsView.vue'; 
import CartView from '../../../ics3u/src/views/CartView.vue';



const routes = [
 
    { path: '/register', component: RegisterView },
    { path: '/login', component: LoginView },
    { path: '/', component: HomeView },
    { path: '/movies', name: 'movies', component: MoviesView },
    { path: '/detailsview/:id', name: 'detail', component: DetailView },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView, 
      },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../../../ics3u/src/views/CartView.vue'),
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;