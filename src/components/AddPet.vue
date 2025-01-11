<template>
  <div class="container my-5">
    <h1 class="display-4 fw-bold text-center mb-4">Add a new pet!</h1>
    <form
      @submit.prevent="validateAndSubmit"
      class="form-container shadow p-4 rounded"
    >
      <!-- Pet Name -->
      <div class="form-outline mb-4">
        <input
          type="text"
          id="petName"
          v-model="pet.name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          placeholder=" "
        />
        <label class="form-label" for="petName">Pet's Name</label>
        <div class="invalid-feedback" v-if="errors.name">
          {{ errors.name }}
        </div>
      </div>

      <!-- Description -->
      <div class="form-outline mb-4">
        <textarea
          id="description"
          v-model="pet.description"
          class="form-control"
          :class="{ 'is-invalid': errors.description }"
          placeholder=" "
          rows="3"
        ></textarea>
        <label class="form-label" for="description">Description</label>
        <div class="invalid-feedback" v-if="errors.description">
          {{ errors.description }}
        </div>
      </div>

      <!-- Pet Type -->
      <div class="form-outline mb-4">
        <select
          id="petType"
          v-model="pet.type"
          class="form-select"
          :class="{ 'is-invalid': errors.type }"
        >
          <option disabled value="">Select pet type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
        </select>
        <label class="form-label" for="petType">Type</label>
        <div class="invalid-feedback" v-if="errors.type">
          {{ errors.type }}
        </div>
      </div>

      <!-- Age -->
      <div class="form-outline mb-4">
        <input
          type="number"
          id="petAge"
          v-model.number="pet.age"
          class="form-control"
          :class="{ 'is-invalid': errors.age }"
          min="0"
          max="30"
        />
        <label class="form-label" for="petAge">Age (years)</label>
        <div class="invalid-feedback" v-if="errors.age">
          {{ errors.age }}
        </div>
      </div>

      <!-- Image Upload -->
      <div class="mb-4">
        <label class="form-label">Pet Photo</label>
        <ImageUploader
          :max-size="5"
          :initial-image="pet.image"
          @image-selected="handleImageSelected"
          @image-removed="handleImageRemoved"
        />
        <div class="invalid-feedback d-block" v-if="errors.image">
          {{ errors.image }}
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn btn-primary btn-block w-100"
        :disabled="isSubmitting"
      >
        <span
          v-if="isSubmitting"
          class="spinner-border spinner-border-sm me-2"
        ></span>
        {{ isSubmitting ? "Adding Pet..." : "Add Pet" }}
      </button>
    </form>

    <!-- Status Message -->
    <StatusMessage
      v-model:show="showStatus"
      :message="statusMessage"
      :type="statusType"
    />
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import ImageUploader from "./ImageUploader.vue";
import StatusMessage from "./StatusMessage.vue";

export default {
  name: "AddPet",
  components: {
    ImageUploader,
    StatusMessage,
  },
  data() {
    return {
      pet: {
        name: "",
        description: "",
        image: "",
        type: "",
        age: null,
      },
      errors: {},
      isSubmitting: false,
      showStatus: false,
      statusMessage: "",
      statusType: "success",
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.pet.name || this.pet.name.length < 2) {
        this.errors.name = "Name must be at least 2 characters long";
      }

      if (!this.pet.description || this.pet.description.length < 10) {
        this.errors.description =
          "Description must be at least 10 characters long";
      }

      if (!this.pet.type) {
        this.errors.type = "Please select a pet type";
      }

      if (this.pet.age === null || this.pet.age < 0 || this.pet.age > 30) {
        this.errors.age = "Age must be between 0 and 30 years";
      }

      if (!this.pet.image) {
        this.errors.image = "Please upload a pet photo";
      }

      return Object.keys(this.errors).length === 0;
    },
    async validateAndSubmit() {
      if (!this.validateForm()) {
        this.showStatusMessage("Please fix the errors in the form", "danger");
        return;
      }

      this.isSubmitting = true;

      try {
        const petStore = usePetStore();
        await petStore.addPet(this.pet);

        this.showStatusMessage("Pet added successfully!", "success");
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 1500);
      } catch (error) {
        this.showStatusMessage(
          "Failed to add pet. Please try again.",
          "danger"
        );
      } finally {
        this.isSubmitting = false;
      }
    },
    handleImageSelected(imageData) {
      this.pet.image = imageData.dataUrl;
      this.errors.image = "";
    },
    handleImageRemoved() {
      this.pet.image = "";
    },
    showStatusMessage(message, type) {
      this.statusMessage = message;
      this.statusType = type;
      this.showStatus = true;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.form-container {
  background: #ffffff;
}

.form-outline {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-outline .form-label {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #6c757d;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

.form-outline .form-control:focus ~ .form-label,
.form-outline .form-control:not(:placeholder-shown) ~ .form-label,
.form-outline .form-select:focus ~ .form-label,
.form-outline .form-select:not([value=""]) ~ .form-label {
  top: -0.75rem;
  left: 0.5rem;
  color: #0d6efd;
  font-size: 0.8rem;
  background: white;
  padding: 0 0.25rem;
}

.form-outline .form-control,
.form-outline .form-select {
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}

.form-outline .form-control:focus,
.form-outline .form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-primary:disabled {
  background-color: #0d6efd;
  border-color: #0d6efd;
  opacity: 0.65;
}
</style>
