<template>
    <div>
        <h1>Choose your simulation</h1>
        <!-- Add buttons to navigate to the different simulations TODO CHANGE NAMES -->
        <button @click="$router.push('/simulation/simulation1')">Go to Simulation 1</button>
        <button @click="$router.push('/simulation/simulation2')">Go to Simulation 2</button>
        <button @click="$router.push('/simulation/simulation3')">Go to Simulation 3</button>
    </div>
</template>

<style scoped>
button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
}
</style>