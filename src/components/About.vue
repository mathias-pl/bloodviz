<template>
    <div class="about">
        <h2>About BloodViz</h2>
        <p style="width: 50%;">This project has been started during McGill Physics Hackathon 2024,
            a competition where 170+ participants from different backgrounds try to create an app to show
            physics phenomenons. We decided to focus on biophysics, more specifically on blood circulation
            in the body and the different diseases related to it.</p>
        <p style="width: 50%;">This project is still in development and we are working hard to make it as
            accurate as possible. We are also working on a sandbox mode where you can create your own
            blood vessels and see how the blood flows through them. We hope you enjoy this project!</p>
        <h2>The team</h2>
        <div style="display: flex; align-items: center; width: 50%; margin-bottom: 20px;">
            <img src="../assets/mathias.png" alt="Mathias Pacheco Lemina" style="border-radius: 50%; width: 100px; height: 100px; margin-right: 20px;">
            <p><strong>Mathias Pacheco Lemina</strong> is a Computer Engineering student at McGill University.
                His main interests are robotics, embedded systems, data analysis and simulations.
                Outside of his studies, he enjoys soccer, running, photography, entrepreneurship, and annoying Bethany.</p>
        </div>
        <div style="display: flex; align-items: center; width: 50%; margin-bottom: 20px;">
            <img src="../assets/bethany.jpg" alt="Bethany Walton-Knight" style="border-radius: 50%; width: 100px; height: 100px; margin-right: 20px;">
            <p><strong>Bethany Walton-Knight</strong> is a Physics student at McGill University.
            Her main interests are solar system dynamics and data analysis.
            Outside of her studies, she enjoys track & field, reading, singing, cooking, and annoying Mathias.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
.about {
    text-align: center;
    margin: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.about h2 {
    font-size: 1.5em;
    margin-bottom: 0;
}

.about p {
    font-size: 1.2em;
    margin-top: 0;
}
</style>