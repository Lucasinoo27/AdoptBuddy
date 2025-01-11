<template>
  <div>
    <div v-if="error" class="error-boundary">
      <div class="error-content">
        <i
          class="fas fa-exclamation-circle text-danger mb-3"
          style="font-size: 3rem"
        ></i>
        <h2 class="text-danger">
          {{ error.message || "Something went wrong" }}
        </h2>
        <p class="text-muted">
          {{ error.details || "Please try again later" }}
        </p>
        <div class="mt-4">
          <button class="btn btn-primary me-2" @click="retry">
            <i class="fas fa-redo me-2"></i>Try Again
          </button>
          <button class="btn btn-outline-secondary" @click="goHome">
            <i class="fas fa-home me-2"></i>Go Home
          </button>
        </div>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import { ref, onErrorCaptured } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "ErrorBoundary",
  props: {
    onError: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();
    const error = ref(null);
    let lastError = null;

    onErrorCaptured((err, component, info) => {
      // Prevent infinite error loops
      if (lastError === err) {
        return false;
      }
      lastError = err;

      // Format error for display
      error.value = {
        message: err.message || "An unexpected error occurred",
        details:
          process.env.NODE_ENV === "development"
            ? `Component: ${component?.type?.name || "Unknown"}\nInfo: ${info}`
            : "We're working on fixing this issue",
        original: err,
      };

      // Call custom error handler if provided
      if (props.onError) {
        props.onError(error.value);
      }

      // Log error in development
      if (process.env.NODE_ENV === "development") {
        console.error("Error captured in boundary:", {
          error: err,
          component,
          info,
        });
      }

      // Prevent error from propagating
      return false;
    });

    const retry = () => {
      error.value = null;
      lastError = null;
      // Force re-render of child components
      if (window) window.location.reload();
    };

    const goHome = () => {
      error.value = null;
      lastError = null;
      router.push({ name: "Home" });
    };

    return {
      error,
      retry,
      goHome,
    };
  },
};
</script>

<style scoped>
.error-boundary {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.error-content {
  max-width: 500px;
}

.error-content h2 {
  margin: 1rem 0;
  font-size: 1.5rem;
}

.error-content p {
  margin-bottom: 1.5rem;
}
</style>
