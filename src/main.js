import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Test from './components/Test.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: App },
    { path: '/component1', component: Test },
    { path: '/component2', component: Test },
    { path: '/component3', component: Test }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');