<template>
  <ErrorBoundary>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <div class="container-fluid">
          <router-link class="navbar-brand nav-item" to="/home">
            <img src="/favicon.png" alt="AdoptBuddy Logo" class="logo me-2" />
            <span class="site-name">AdoptBuddy</span>
          </router-link>
          <div class="navbar-nav mx-auto">
            <router-link
              class="nav-link nav-item"
              to="/home"
              :class="{ active: $route.name === 'Home' }"
            >
              Home
            </router-link>
            <router-link
              class="nav-link nav-item"
              to="/add-pet"
              :class="{ active: $route.name === 'AddPet' }"
            >
              Add Pet
            </router-link>
            <router-link
              class="nav-link nav-item"
              to="/about"
              :class="{ active: $route.name === 'About' }"
            >
              About
            </router-link>
          </div>
        </div>
      </nav>

      <div v-if="isLoading" class="loader-wrapper">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <ErrorBoundary>
        <router-view />
      </ErrorBoundary>
    </div>
  </ErrorBoundary>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

export default {
  name: "App",
  components: {
    ErrorBoundary,
  },
  setup() {
    const isLoading = ref(false);
    const router = useRouter();

    router.beforeEach((to, from, next) => {
      isLoading.value = true;
      next();
    });

    router.afterEach(() => {
      isLoading.value = false;
    });

    const handleError = (error) => {
      console.error("Global error caught:", error);
      // You could also send this to an error tracking service
    };

    return {
      isLoading,
      handleError,
    };
  },
};
</script>

<style>
.navbar {
  margin: 0;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1030;
}

.logo {
  height: 40px;
  width: auto;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.nav-item {
  margin: 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: black;
}

.nav-item:hover {
  color: #34a89e;
}

.nav-item.active {
  color: #34a89e;
  font-weight: bold;
}
</style>
