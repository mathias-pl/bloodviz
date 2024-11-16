<script setup>
import Test from './components/Test.vue';
</script>

<template>

  <div id="main_menu">
    <div style="display: flex; justify-content: center; align-items: center;">
      <img src="/logo.png" alt="Logo" style="height: 100px; margin-right: 20px;">
      <h1>BloodViz</h1>
    </div>
    <p>Your best friend to understand blood vessels and the physics behind it</p>
  </div>
  <router-view></router-view>
  <div style="display: flex; justify-content: center; margin-top: 20px;">
    <button @click="$router.push('/component1')">Component 1</button>
    <button @click="$router.push('/component2')">Component 2</button>
    <button @click="$router.push('/')">Component 3</button>
  </div>
</template>

<style scoped>
</style>
