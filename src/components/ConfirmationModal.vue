<template>
  <div
    v-if="show"
    class="modal fade show"
    tabindex="-1"
    style="display: block"
    @click.self="close"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ modalMessage }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">
            {{ cancelText }}
          </button>
          <button
            type="button"
            :class="['btn', `btn-${buttonType}`]"
            @click="confirm"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      default: "default",
      validator: (value) => ["default", "delete"].includes(value),
    },
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    confirmButtonType: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "danger", "warning"].includes(value),
    },
    itemName: {
      type: String,
      default: "",
    },
  },
  computed: {
    modalTitle() {
      if (this.type === "delete") {
        return this.title || `Delete ${this.itemName || "Item"}`;
      }
      return this.title || "Confirm Action";
    },
    modalMessage() {
      if (this.type === "delete" && this.itemName) {
        return (
          this.message ||
          `Are you sure you want to delete ${this.itemName}? This action cannot be undone.`
        );
      }
      return this.message;
    },
    buttonType() {
      return this.type === "delete" ? "danger" : this.confirmButtonType;
    },
    confirmButtonText() {
      if (this.confirmText) return this.confirmText;
      return this.type === "delete" ? "Delete" : "Confirm";
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
      this.$emit("update:show", false);
    },
    close() {
      this.$emit("cancel");
      this.$emit("update:show", false);
    },
  },
  mounted() {
    document.body.style.overflow = "visible";
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

.modal-content {
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
  padding: 1rem;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
  padding: 1rem;
}

.btn-close:focus {
  box-shadow: none;
}

/* Animation classes */
.modal.fade.show {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
