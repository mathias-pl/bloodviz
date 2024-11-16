<script setup>
</script>

<template>
  <div id="container">
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
    </div>

    <router-view></router-view>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
#main_menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
