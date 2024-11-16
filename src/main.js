import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Simulation from './components/Simulation.vue';
import Simulation1 from './components/simulation/Simulation1.vue';
import Simulation2 from './components/simulation/Simulation2.vue';
import Simulation3 from './components/simulation/Simulation3.vue';

import Sandbox from './components/Sandbox.vue';
import About from './components/About.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: App },
    { path: '/simulation', component: Simulation },
    { path: '/simulation/simulation1', component: Simulation1 },
    { path: '/simulation/simulation2', component: Simulation2 },
    { path: '/simulation/simulation3', component: Simulation3 },
    { path: '/sandbox', component: Sandbox },
    { path: '/about', component: About }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');