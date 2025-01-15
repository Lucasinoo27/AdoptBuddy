<template>
  <Transition name="fade">
    <div v-if="isVisible" class="loader-wrapper">
      <div class="spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "LoadingOverlay",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 2000;
}

.spinner {
  text-align: center;
}

.spinner p {
  color: #6366f1;
  font-weight: 500;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
