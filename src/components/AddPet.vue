<template>
  <div class="form-wrapper" data-aos="fade-up">
    <form @submit.prevent="validateAndSubmit" class="modern-form">
      <!-- Pet Name -->
      <div class="form-group" data-aos="fade-up" data-aos-delay="100">
        <div class="input-wrapper">
          <div class="input-icon">
            <i class="fas fa-paw"></i>
          </div>
          <div class="input-container">
            <input
              type="text"
              id="petName"
              v-model="pet.name"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              placeholder=" "
            />
            <label for="petName">Pet's Name</label>
          </div>
        </div>
        <div class="error-message" v-if="errors.name">
          <i class="fas fa-exclamation-circle"></i>
          {{ errors.name }}
        </div>
      </div>

      <!-- Description -->
      <div class="form-group" data-aos="fade-up" data-aos-delay="200">
        <div class="input-wrapper">
          <div class="input-icon">
            <i class="fas fa-comment-alt"></i>
          </div>
          <div class="input-container">
            <textarea
              id="description"
              v-model="pet.description"
              class="form-control"
              :class="{ 'is-invalid': errors.description }"
              placeholder=" "
              rows="3"
            ></textarea>
            <label for="description">Description</label>
          </div>
        </div>
        <div class="error-message" v-if="errors.description">
          <i class="fas fa-exclamation-circle"></i>
          {{ errors.description }}
        </div>
      </div>

      <!-- Pet Type -->
      <div class="form-group" data-aos="fade-up" data-aos-delay="300">
        <div class="input-wrapper">
          <div class="input-icon">
            <i class="fas fa-tag"></i>
          </div>
          <div class="input-container">
            <select
              id="petType"
              v-model="pet.type"
              class="form-control"
              :class="{ 'is-invalid': errors.type }"
            >
              <option disabled value="">Select pet type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
            <label for="petType">Type</label>
          </div>
        </div>
        <div class="error-message" v-if="errors.type">
          <i class="fas fa-exclamation-circle"></i>
          {{ errors.type }}
        </div>
      </div>

      <!-- Age -->
      <div class="form-group" data-aos="fade-up" data-aos-delay="400">
        <div class="input-wrapper">
          <div class="input-icon">
            <i class="fas fa-birthday-cake"></i>
          </div>
          <div class="input-container">
            <input
              type="number"
              id="petAge"
              v-model.number="pet.age"
              class="form-control"
              :class="{ 'is-invalid': errors.age }"
              min="0"
              max="30"
              placeholder=" "
            />
            <label for="petAge">Age (years)</label>
          </div>
        </div>
        <div class="error-message" v-if="errors.age">
          <i class="fas fa-exclamation-circle"></i>
          {{ errors.age }}
        </div>
      </div>

      <!-- Image Upload -->
      <div class="form-group" data-aos="fade-up" data-aos-delay="500">
        <label class="upload-label">Pet Photo</label>
        <ImageUploader
          :max-size="5"
          :initial-image="pet.image"
          @image-selected="handleImageSelected"
          @image-removed="handleImageRemoved"
        />
        <div class="error-message" v-if="errors.image">
          <i class="fas fa-exclamation-circle"></i>
          {{ errors.image }}
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="submit-button"
        :disabled="isSubmitting"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <span
          v-if="isSubmitting"
          class="spinner-border spinner-border-sm me-2"
        ></span>
        <i class="fas fa-plus-circle me-2" v-else></i>
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
.form-wrapper {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.modern-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.input-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.input-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.input-icon i {
  font-size: 1.25rem;
  color: white;
}

.input-container {
  position: relative;
  flex-grow: 1;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  outline: none;
}

.form-control.is-invalid {
  border-color: #ef4444;
}

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 0 0.25rem;
  color: #6b7280;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  pointer-events: none;
}

textarea ~ label {
  top: 1rem;
  transform: none;
}

.form-control:focus ~ label,
.form-control:not(:placeholder-shown) ~ label {
  top: -0.5rem;
  left: 0.75rem;
  font-size: 0.75rem;
  color: #6366f1;
}

.form-control.is-invalid ~ label {
  color: #ef4444;
}

.error-message {
  margin-top: 0.5rem;
  color: #ef4444;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.submit-button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 1.5rem;
  }

  .input-wrapper {
    flex-direction: column;
  }

  .input-icon {
    display: none;
  }
}
</style>
