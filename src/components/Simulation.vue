<template>
    <div>
        <h1>Choose your simulation</h1>
        <!-- Add buttons to navigate to the different simulations TODO CHANGE NAMES -->
        <button @click="$router.push('/simulation/healthy')">Healthy</button>
        <button @click="$router.push('/simulation/atherosclerosis')">Atherosclerosis</button>
        <button @click="$router.push('/simulation/raynaud')">Raynaud's phenomenon</button>
    </div>
</template>

<style scoped>
button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
}
</style>