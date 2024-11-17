<template>
    <div class="simulation">
        <h2>Healthy blood vessel</h2>
        <p style="width: 50%;">Healthy blood vessels allow blood to flow easily. A healthy blood pressure is less than
            120 mmHg systolic and 80 mmHg diastolic (120/80), but greater than 90/60. This simulation uses a blood
            pressure of 120/80. Blood viscosity can change throughout the body and depending on the composition of the
            blood. The viscosity of this vessel is modelled after the abdominal aorta with a value of 0.0035
            Pascal-seconds. The maximum speed at the centre of the vessel has been scaled to be 5 pixels/second to be
            visible to the human eye. The blood is composed of 55% plasma, 44% red blood cells, and 1% white blood
            cells.</p>
        <canvas id="webglCanvas" width="1000px" height="400px"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Healthy',
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
        const border_w = 15;
        const plv = 1.25e-4; // Pressure, length, viscosity
        const r_sqrt = (canvas.height / 2 - border_w) ** 2;
        const min_speed = 1;
        const beat_per_l = 4;
        const particles = [];

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
    gap: 10px;
}

.simulation h2 {
    margin-bottom: 0;
}

.simulation p {
    margin-top: 0;
}
</style>