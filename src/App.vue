<template>
  <ErrorBoundary>
    <div id="app">
      <MainNavbar />
      <LoadingOverlay :is-visible="isLoading" />
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </ErrorBoundary>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import MainNavbar from "@/components/navigation/Navbar.vue";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";

export default {
  name: "App",
  components: {
    ErrorBoundary,
    MainNavbar,
    LoadingOverlay,
  },
  setup() {
    const router = useRouter();
    const isLoading = ref(false);

    // Router navigation guards
    const beforeGuard = (to, from, next) => {
      isLoading.value = true;
      next();
    };

    const afterGuard = () => {
      isLoading.value = false;
    };

    // Setup and cleanup navigation guards
    onMounted(() => {
      router.beforeEach(beforeGuard);
      router.afterEach(afterGuard);
    });

    onUnmounted(() => {
      router.beforeEach(() => {});
      router.afterEach(() => {});
    });

    const handleError = (error) => {
      console.error("Global error caught:", error);
    };

    return {
      isLoading,
      handleError,
    };
  },
};
</script>

<style>
/* Reset and base styles */
html,
body {
  margin: 0;
  padding: 0;
  overflow-y: visible;
}

/* Main app container */
#app {
  min-height: 100vh;
  padding-top: 72px;
}

@media (max-width: 991.98px) {
  .container-fluid {
    padding: 0 1rem;
  }
}
</style>
