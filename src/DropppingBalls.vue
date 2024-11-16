<template>
    <canvas ref="canvas" width="800" height="600"></canvas>
    <h1>Hello</h1>
</template>

<script>
export default {
    name: 'DroppingBalls',
    data() {
        return {
            gl: null,
            balls: [],
            gravity: 0.1,
        };
    },
    mounted() {
        this.initWebGL();
        this.createBalls();
        this.animate();
    },
    methods: {
        initWebGL() {
            const canvas = this.$refs.canvas;
            this.gl = canvas.getContext('webgl');
            if (!this.gl) {
                console.error('WebGL not supported');
                return;
            }
        },
        createBalls() {
            for (let i = 0; i < 10; i++) {
                this.balls.push({
                    x: Math.random() * 800,
                    y: Math.random() * 600,
                    radius: 20,
                    speedY: Math.random() * 2 + 1,
                });
            }
        },
        animate() {
            requestAnimationFrame(this.animate);
            this.updateBalls();
            this.drawBalls();
        },
        updateBalls() {
            this.balls.forEach(ball => {
                ball.y += ball.speedY;
                ball.speedY += this.gravity;
                if (ball.y + ball.radius > 600) {
                    ball.y = 600 - ball.radius;
                    ball.speedY *= -0.8;
                }
            });
        },
        drawBalls() {
            const gl = this.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);
            this.balls.forEach(ball => {
                this.drawCircle(ball.x, ball.y, ball.radius);
            });
        },
        drawCircle(x, y, radius) {
            const gl = this.gl;
            const segments = 100;
            const angleStep = (Math.PI * 2) / segments;
            const vertices = [];
            for (let i = 0; i <= segments; i++) {
                const angle = i * angleStep;
                vertices.push(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
            }
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, segments + 1);
        },
    },
};
</script>

<style scoped>
canvas {
    display: block;
    margin: 0 auto;
    background-color: #000;
}
</style>