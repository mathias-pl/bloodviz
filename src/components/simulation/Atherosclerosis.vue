<template>
    <div class="simulation">
        <h2>Blood vessel with athrosclerosis</h2>
        <p style="width: 50%;">Atherosclerosis is the buildup of plaque on the walls of arteries. Plaque can be made of
            fats, cholesterol, and other components. Due to the decreased blood flow, atherosclerosis can lead to heart
            attacks or strokes. If a piece of plaque falls off the wall, it can also cause further problems.</p>
        <canvas id="webglCanvas" width="1000px" height="400px"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Athrosclerosis',
    data() {
        return {
            n: 10000, // Number of particles
            r_plasma: 1,
            r_rbc: 2,
            r_wbc: 5,
            horizontal_speed: 5,
            inelastic_collision: 0.7,
            border_w: 15,
            plv: 1.25e-4, // Pressure, length, viscosity
            min_speed: 1,
            particles: [],
        };
    },
    mounted() {
        const canvas = document.getElementById('webglCanvas');
        canvas.width = window.innerWidth * 0.7;
        canvas.height = window.innerHeight * 0.4;
        const ctx = canvas.getContext('2d');
        const r_obstacle = 3 * canvas.height / 8;
        const obstacles = [
            { x: canvas.width / 4, y: 0 },
            { x: 3 * canvas.width / 4, y: canvas.height }
        ];

        const r_sqrt = (canvas.height / 2 - this.border_w) ** 2;

        for (let i = 0; i < this.n; i++) {
            let r_from_center = (canvas.height / 2 - this.border_w) * Math.random();
            let side = Math.random() < 0.5 ? -1 : 1;
            let type = Math.random() < 0.55 ? 'yellow' : (Math.random() < 0.99 ? 'red' : 'white');

            this.particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height / 2 + r_from_center * side,
                vx: this.plv * (r_sqrt - r_from_center ** 2) + this.min_speed,
                vy: 0,
                r: type === 'yellow' ? this.r_plasma : (type === 'red' ? this.r_rbc : this.r_wbc),
                color: type,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw upper and lower edges
            ctx.fillStyle = 'brown';
            ctx.fillRect(0, 0, canvas.width, this.border_w); // Upper edge
            ctx.fillRect(0, canvas.height - this.border_w, canvas.width, this.border_w); // Lower edge
            
            // Draw obstacles
            obstacles.forEach(obstacle => {
                ctx.fillStyle = 'gray';
                ctx.beginPath();
                ctx.arc(obstacle.x, obstacle.y, r_obstacle, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw particles
            this.particles.forEach(p => {
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
                } else if (p.x - p.r <= 0) {

                    p.x = canvas.width - p.r;
                }

                if (p.y - p.r < this.border_w) {
                    p.vy *= -1;
                    p.y += 1;
                } else if (p.y + p.r > canvas.height - this.border_w) {
                    p.vy *= -1;
                    p.y -= 1;
                }

                // Check for collisions with obstacles
                if (p.y > canvas.height - r_obstacle || p.y < r_obstacle) {
                    // alert('Game over!');
                    obstacles.forEach(obstacle => this.checkCollision(obstacle, p, true, canvas));
                }
            });

            requestAnimationFrame(draw);
        };

        draw();
    },
    methods: {
        checkCollision(obstacle, particle, first, canvas) {
            const dx = particle.x - obstacle.x;
            const dy = particle.y - obstacle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const r_obs = 3 * (canvas.height / 8);
            
            if (distance < r_obs + particle.r) {
                // Simple elastic collision response
                const angle = Math.atan2(dy, dx);

                if (first) {
                    particle.vx = this.inelastic_collision * Math.cos(angle) * this.horizontal_speed;
                    particle.vy = this.inelastic_collision * Math.sin(angle) * this.horizontal_speed;
                }

                particle.y += particle.vy;

                while (this.checkCollision(obstacle, particle, false, canvas)) {
                    particle.y += particle.vy;
                }

                return true;
            }

            return false;
        }
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