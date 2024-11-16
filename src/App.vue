<script setup>
import { onMounted, ref } from 'vue';

const canvas = ref(null);

onMounted(() => {
  const balls = [];
  const numBalls = 100;
  const gravity = 0.1;

  class Ball {
    constructor(x, y, radius, dx, dy) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx;
      this.dy = dy;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }

    update() {
      for (let i = 0; i < balls.length; i++) {
        if (this === balls[i]) continue;

        const dx = balls[i].x - this.x;
        const dy = balls[i].y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = this.radius + balls[i].radius;

        if (distance < minDist) {
          const angle = Math.atan2(dy, dx);
          const targetX = this.x + Math.cos(angle) * minDist;
          const targetY = this.y + Math.sin(angle) * minDist;
          const ax = (targetX - balls[i].x) * 0.05;
          const ay = (targetY - balls[i].y) * 0.05;

          this.dx -= ax;
          this.dy -= ay;
          balls[i].dx += ax;
          balls[i].dy += ay;
        }
      }

      this.x += this.dx;
      this.y += this.dy;

      if (this.x + this.radius > canvas.value.width || this.x - this.radius < 0) {
        this.dx *= -1;
      }

      if (this.y + this.radius > canvas.value.height || this.y - this.radius < 0) {
        this.dy *= -1;
      }
    }
  }

  function init() {
    for (let i = 0; i < numBalls; i++) {
      const radius = 15;
      const x = Math.random() * (canvas.value.width - radius * 2) + radius;
      const y = Math.random() * (canvas.value.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 4;
      const dy = (Math.random() - 0.5) * 4;
      balls.push(new Ball(x, y, radius, dx, dy));
    }
  }

  function animate() {
    const ctx = canvas.value.getContext('2d');
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    balls.forEach(ball => {
      ball.update();
      ball.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  init();
  animate();
});
</script>

<template>

  <h1>SpaceBox</h1>
  <canvas ref="canvas" width="1000" height="600"></canvas>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div>
      <button @click="handleButtonClick('button1')">Button 1</button>
      <button @click="handleButtonClick('button2')">Button 2</button>
      <button @click="handleButtonClick('button3')">Button 3</button>
    </div>
  </div>
</template>

<style scoped>

</style>
