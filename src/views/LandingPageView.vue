<template>
  <div class="home">
    <HomeTitle />
    <LandingPageButton />
  </div>
</template>

<script>
import HomeTitle from "@/components/LandingPage/index.vue";
import LandingPageButton from "@/components/LandingPage/Button.vue";

export default {
  name: "LandingPage",
  components: {
    HomeTitle,
    LandingPageButton,
  },
};
</script>

<style scoped>
.home {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 2em;
  font-weight: 500;
  top: 0;
  left: 0;
}

.home > * {
  position: relative;
  left: calc(2.8em + 8vw);
  bottom: 4vh;
  z-index: 1;
  margin: 0.2em 0;
}
</style>
