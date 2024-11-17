<template>
    <div class="simulation">
        <h2>Raynaud's disease</h2>
        <p style="width: 50%;">Raynaud’s disease causes small blood vessels in your fingers, toes, ears, or nose to
            constrict much more than they should in response to stress or cold temperatures. This limits the blood flow
            and therefore, the transportation of oxygen, which can turn these extremities blue or white and make them
            feel numb.</p>
        <canvas id="webglCanvas" width="1000px" height="400px"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Raynaud',
    mounted() {
        const canvas = document.getElementById('webglCanvas');
        canvas.width = window.innerWidth * 0.7;
        canvas.height = window.innerHeight * 0.4;
        const ctx = canvas.getContext('2d');

        const n = 10000; // Number of particles
        const r_plasma = 1;
        const r_rbc = 2;
        const r_wbc = 5;
        const horizontal_speed = 5;
        const border_w = 130;
        const plv = 0.75e-4; // Pressure, length, viscosity
        const r_sqrt = (canvas.height / 2 - border_w) ** 2;
        const min_speed = 1;
        const beat_per_l = 4;
        const particles = [];

        for (let i = 0; i < n; i++) {
            let r_from_center = (canvas.height / 2 - border_w) * Math.random();
            let side = Math.random() < 0.5 ? -1 : 1;
            let type = Math.random() < 0.55 ? 'yellow' : (Math.random() < 0.99 ? 'red' : 'white');

            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height / 2 + r_from_center * side,
                vx: plv * (r_sqrt - r_from_center ** 2) + min_speed,
                vy: 0,
                r: type === 'yellow' ? r_plasma : (type === 'red' ? r_rbc : r_wbc),
                color: type,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw upper and lower edges
            ctx.fillStyle = 'brown';
            ctx.fillRect(0, 0, canvas.width, border_w); // Upper edge
            ctx.fillRect(0, canvas.height - border_w, canvas.width, border_w); // Lower edge

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

.simulation h2 {
    margin-bottom: 0;
}

.simulation p {
    margin-top: 0;
}
</style>