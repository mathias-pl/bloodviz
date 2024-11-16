<template>
    <div class="simulation">
        <h2>Healthy blood vessel</h2>
        <p style="width: 50%;">Healthy blood vessels are flexible, strong, and elastic. 
        They are lined with a thin layer of cells called the endothelium. 
        The endothelium produces nitric oxide, a molecule that helps control blood pressure. 
        The endothelium also produces other molecules that help control blood clotting, immune 
        function, and the formation of new blood vessels.</p>
        <canvas id="webglCanvas" width="1000px" height="400px"></canvas>
        <h3>Flow</h3>
        <p style="width: 50%;">The blood flow is represented by the red particles.</p>
    </div>
</template>

<script>
export default {
    name: 'Simulation1',
    mounted() {
        const canvas = document.getElementById('webglCanvas');
        const ctx = canvas.getContext('2d');

        const n = 1000; // Number of particles
        const r = 2; // Radius of particles
        const particles = [];

        for (let i = 0; i < n; i++) {
            particles.push({
                x: r,
                y: Math.random() * canvas.height,
                vx: Math.random() * 5,
                vy: (Math.random() - 0.5) * 2,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw upper and lower edges
            ctx.fillStyle = 'brown';
            ctx.fillRect(0, 0, canvas.width, 10); // Upper edge
            ctx.fillRect(0, canvas.height - 10, canvas.width, 10); // Lower edge

            // Draw the obstacle
            ctx.fillStyle = 'gray';
            const obstacleX = canvas.width / 2;
            const obstacleY = canvas.height / 2;
            const obstacleWidth = 50;
            const obstacleHeight = 50;
            ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);

            // Draw particles
            ctx.fillStyle = 'red';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                ctx.fill();

                // Update particle position
                p.x += p.vx;
                p.y += p.vy;

                // Check for collisions with edges
                if (p.x + r > canvas.width) {
                    p.x = r;
                } else if (p.x - r < 0) {
                    p.x = canvas.width - r;
                }

                if (p.y - r < 10 || p.y + r > canvas.height - 10) {
                    p.vy *= -1;
                }

                // Check for collisions with the obstacle
                const obstacleX = canvas.width / 2;
                const obstacleY = canvas.height / 2;
                const obstacleWidth = 50;
                const obstacleHeight = 50;

                if (
                    p.x + r > obstacleX &&
                    p.x - r < obstacleX + obstacleWidth &&
                    p.y + r > obstacleY &&
                    p.y - r < obstacleY + obstacleHeight
                ) {
                    p.vx *= -1;
                    p.vy *= -1;
                }
            });

            requestAnimationFrame(draw);
        }

        draw();
    }
};
</script>

<style scoped>
.simulation {
    text-align: center;
    margin: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>