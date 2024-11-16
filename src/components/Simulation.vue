<template>
    <div>
        <h1>Simulation Page</h1>
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