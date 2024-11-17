<template>
    <div class="simulation">
        <h2>Aneurysm</h2>
        <p style="width: 50%;">An aneurysm is when a weak section of a blood vessel wall widens and fills with blood.
            This can cause blood clots, which lead to strokes, or the aneurysm could rupture, which leads to internal
            bleeding. Hypertension, or long-term high blood pressure, is a leading cause of aneurysms. </p>
        <canvas id="webglCanvas" width="1000px" height="400px"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Healthy',
    data() {
        return {
            canvasHeight: 0
        };
    },
    mounted() {
        const canvas = document.getElementById('webglCanvas');
        canvas.width = window.innerWidth * 0.7;
        canvas.height = window.innerHeight * 0.4;
        this.canvasHeight = canvas.height;

        const ctx = canvas.getContext('2d');

        const n = 10000; // Number of particles
        const r_plasma = 1;
        const r_rbc = 2;
        const r_wbc = 5;
        const horizontal_speed = 5;
        const border_w = 15;
        const plv = 0.5e-4; // Pressure, length, viscosity
        const r_sqrt = (canvas.height / 2 - border_w) ** 2;
        const min_speed = 1;
        const beat_per_l = 4;
        const particles = [];

        const obstacle = {
            x: canvas.width / 2 - 50,
            y: 0,
            width: 100,
            height: canvas.height
        };

        for (let i = 0; i < n; i++) {
            let r_from_center = (canvas.height / 2 - border_w) * Math.random();
            let side = Math.random() < 0.5 ? -1 : 1;
            let type = Math.random() < 0.55 ? 'yellow' : (Math.random() < 0.99 ? 'red' : 'white');
            let tmp_x = Math.random() * canvas.width;

            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height / 2 + r_from_center * side,
                vx: plv * (r_sqrt - r_from_center ** 2) + min_speed,
                vy: 0,
                r: type === 'yellow' ? r_plasma : (type === 'red' ? r_rbc : r_wbc),
                color: type,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw upper and lower edges
            ctx.fillStyle = 'brown';
            ctx.fillRect(0, 0, canvas.width, border_w); // Upper edge
            ctx.fillRect(0, canvas.height - border_w, canvas.width, border_w); // Lower edge

            // Draw obstacle
            ctx.fillStyle = 'brown';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

            // Draw particles
            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                // Update particle position
                p.x += p.vx;
                p.y += p.vy;

                // Check for collisions with edges
                if (p.x + p.r > canvas.width) {
                    p.x = p.r;
                } else if (p.x - p.r < 0) {
                    let r_from_center = (canvas.height / 2 - border_w) * Math.random();
                    let side = Math.random() < 0.5 ? -1 : 1;

                    particles.splice(particles.indexOf(p), 1, {
                        x: p.r,
                        y: canvas.height / 2 + r_from_center * side,
                        vx: plv * (r_sqrt - r_from_center ** 2) + min_speed,
                        vy: 0,
                        r: p.r,
                        color: p.color,
                    });
                }

                if (p.y - p.r < border_w) {
                    p.vy *= -1;
                    p.y += 1;
                }
                else if (p.y + p.r > canvas.height - border_w) {
                    p.vy *= -1;
                    p.y -= 1;
                }

                // Check for collisions with obstacle
                if (p.x + p.r > obstacle.x && p.x - p.r < obstacle.x + obstacle.width &&
                    p.y + p.r > obstacle.y && p.y - p.r < obstacle.y + obstacle.height) {
                    p.vx = 0;
                    p.vy = 0;
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
    gap: 10px;
}

.simulation h2 {
    margin-bottom: 0;
}

.simulation p {
    margin-top: 0;
}
</style>