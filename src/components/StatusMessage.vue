<template>
  <transition name="fade">
    <div
      v-if="show"
      :class="[
        'alert',
        `alert-${type}`,
        'd-flex',
        'align-items-center',
        'justify-content-between',
        'status-message',
      ]"
      role="alert"
    >
      <div class="d-flex align-items-center">
        <!-- Success Icon -->
        <i
          v-if="type === 'success'"
          class="fas fa-check-circle me-2"
          aria-hidden="true"
        ></i>
        <!-- Error Icon -->
        <i
          v-if="type === 'danger'"
          class="fas fa-exclamation-circle me-2"
          aria-hidden="true"
        ></i>
        <!-- Warning Icon -->
        <i
          v-if="type === 'warning'"
          class="fas fa-exclamation-triangle me-2"
          aria-hidden="true"
        ></i>
        <!-- Info Icon -->
        <i
          v-if="type === 'info'"
          class="fas fa-info-circle me-2"
          aria-hidden="true"
        ></i>
        <span>{{ message }}</span>
      </div>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="dismiss"
      ></button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "StatusMessage",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
      validator: (value) =>
        ["success", "danger", "warning", "info"].includes(value),
    },
    duration: {
      type: Number,
      default: 3000,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  watch: {
    show(newValue) {
      if (newValue && this.duration > 0) {
        this.setAutoDismiss();
      }
    },
  },
  methods: {
    dismiss() {
      if (this.dismissible) {
        this.$emit("update:show", false);
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      }
    },
    setAutoDismiss() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.dismiss();
      }, this.duration);
    },
  },
  beforeUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
};
</script>

<style scoped>
.status-message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Custom colors for different status types */
.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.alert-info {
  background-color: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
}

/* Icon colors */
.alert-success i {
  color: #28a745;
}

.alert-danger i {
  color: #dc3545;
}

.alert-warning i {
  color: #ffc107;
}

.alert-info i {
  color: #17a2b8;
}
</style>
