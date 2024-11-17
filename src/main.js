import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Simulation from './components/Simulation.vue';
import Healthy from './components/simulation/Healthy.vue';
import Anemia from './components/simulation/Anemia.vue';
import Atherosclerosis from './components/simulation/Atherosclerosis.vue';
import Raynayd from './components/simulation/Raynaud.vue';

import Sandbox from './components/Sandbox.vue';
import About from './components/About.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: App },
    { path: '/simulation', component: Simulation },
    { path: '/simulation/healthy', component: Healthy },
    { path: '/simulation/anemia', component: Anemia },
    { path: '/simulation/atherosclerosis', component: Atherosclerosis },
    { path: '/simulation/raynaud', component: Raynayd },
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