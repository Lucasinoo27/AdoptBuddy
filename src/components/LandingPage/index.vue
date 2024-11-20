<template>
  <div class="title-container">
    <h1>Find <span class="highlight">THE PERFECT PET</span></h1>
    <p>that fits you</p>
  </div>
</template>

<script>
export default {
  name: "HomeTitle",
};
</script>

<style scoped>
.title-container {
  color: #2c3e50;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
}

h1 {
  font-size: 3.5em;
  font-weight: bold;
}

p {
  font-size: 1.5em;
  margin-top: 0.5em;
  color: #4d4d4d;
}

.highlight {
  color: #34a89e;
  text-decoration: underline;
  font-weight: bold;
}
</style>
