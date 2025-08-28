import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Go from './views/Go.vue';

const routes = [
  { path: '/', redirect: '/go' },
  { path: '/go', component: Go },
  { path: '/:site', component: Go }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
