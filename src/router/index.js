import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/create-dataset',
    name: 'create-dataset',
    component: () => import('../views/CreateDataset.vue'),
  },
  {
    path: '/create-model',
    name: 'create-model',
    component: () => import('../views/CreateModel.vue'),
  },
  {
    path: '/training',
    name: 'training',
    component: () => import('../views/Training.vue'),
  },
  {
    path: '/results/:dataset/:modelname',
    name: 'results',
    component: () => import('../views/Results.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
