<template>
  <router-link :to="{ name: 'Home' }">
    <div class="btn-container">
      <span>
        <SearchIcon />
        Start Looking
      </span>
    </div>
  </router-link>
</template>

<script>
import SearchIcon from "vue-material-design-icons/Magnify.vue";

export default {
  name: "LandingPageButton",
  components: {
    SearchIcon,
  },
};
</script>

<style scoped>
.btn-container {
  background: #3aab97;
  border-radius: 5em;
  padding: 0.4em 0.9em;
  font-size: 1em;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  border: 2px solid #3aab97;
  cursor: pointer;
  transition: 0.3s;
}

.btn-container:hover {
  background: transparent;
  color: #3aab97;
}

.btn-container span {
  display: flex;
  align-items: center;
}

.btn-container span svg {
  margin-right: 0.5em;
}
</style>
