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
  mounted() {
    document.body.classList.add("no-scroll");
  },
  unmounted() {
    document.body.classList.remove("no-scroll");
  },
};
</script>

<style scoped>
.home {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("/src/assets/home-background.png") no-repeat center center;
  background-size: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10vw;
}

.home > * {
  margin: 1em 0;
}
</style>
