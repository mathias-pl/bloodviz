<script setup>
</script>

<template>
  <div id="main_menu">
    <div style="display: flex; justify-content: center; align-items: center;">
      <img src="/logo.png" alt="Logo" style="height: 100px; margin-right: 20px;">
      <h1>BloodViz</h1>
    </div>
    <p>Your best friend to understand blood vessels and the physics behind it</p>
    <div style="display: flex; justify-content: center; margin-top: 15px;">
      <button @click="$router.push('/simulation')" style="margin-right: 20px;">Simulation</button>
      <button @click="$router.push('/sandbox')" style="margin-right: 20px;">Sandbox (beta)</button>
      <button @click="$router.push('/about')">About</button>
    </div>
    <router-view></router-view>
    <a href="https://www.hemaquebec.ca/en?gad_source=1" target="_blank"
      style="position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%);">Donate blood: Héma-Québec</a>
  </div>
</template>

<style scoped>
#main_menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
