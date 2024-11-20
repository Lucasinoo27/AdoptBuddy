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
  background: #34a89e;
  border-radius: 50px;
  padding: 0.6em 1.5em;
  font-size: 1.2em;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #34a89e;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-container:hover {
  background: white;
  color: #34a89e;
}

.btn-container span {
  display: flex;
  align-items: center;
}

.btn-container span svg {
  margin-right: 0.5em;
  width: 1.5em;
  height: 1.5em;
}
</style>
