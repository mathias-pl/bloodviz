<template>
    <div>
        <button @click="showAlert">Hello World</button>
    </div>
</template>

<script>
export default {
    name: 'Test',
    methods: {
        showAlert() {
            alert('Hello World');
        }
    }
}
</script>

<style scoped>
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>