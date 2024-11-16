<script setup>
import { onMounted, ref } from 'vue';

const canvas = ref(null);

onMounted(() => {
  const ctx = canvas.value.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(125, 125, 250, 250);
let x = 125;
let dx = 2;

function draw() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(x, 125, 250, 250);

  if (x + 250 > canvas.value.width || x < 0) {
    dx = -dx;
  }

  x += dx;
  requestAnimationFrame(draw);
}

draw();
});
</script>

<template>
  <h1>SpaceBox</h1>
  <canvas ref="canvas" width="500" height="500"></canvas>
</template>

<style scoped>

</style>
