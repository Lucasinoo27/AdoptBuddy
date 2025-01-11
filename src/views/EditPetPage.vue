<template>
  <div class="container my-5">
    <div v-if="pet">
      <!-- Back Navigation -->
      <button class="btn btn-link mb-4" @click="goBack">
        <i class="fas fa-arrow-left me-2"></i>Back to pet details
      </button>

      <h1 class="display-4 fw-bold text-center mb-4">Edit {{ pet.name }}</h1>

      <!-- Edit Form -->
      <div class="row justify-content-center">
        <div class="col-md-8">
          <form
            @submit.prevent="validateAndSubmit"
            class="form-container shadow p-4 rounded"
          >
            <!-- Pet Name -->
            <div class="form-outline mb-4">
              <input
                type="text"
                id="petName"
                v-model="editedPet.name"
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
                v-model="editedPet.description"
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
                v-model="editedPet.type"
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
                v-model.number="editedPet.age"
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
                :initial-image="editedPet.image"
                @image-selected="handleImageSelected"
                @image-removed="handleImageRemoved"
              />
              <div class="invalid-feedback d-block" v-if="errors.image">
                {{ errors.image }}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-3">
              <button
                type="submit"
                class="btn btn-primary flex-grow-1"
                :disabled="isSubmitting"
              >
                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ isSubmitting ? "Saving..." : "Save Changes" }}
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="confirmDelete"
              >
                Delete Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <h2 class="text-muted">Pet not found</h2>
      <button class="btn btn-primary mt-3" @click="goBack">
        Return to pet list
      </button>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      v-model:show="showDeleteConfirmation"
      title="Delete Pet"
      message="Are you sure you want to delete this pet? This action cannot be undone."
      confirm-text="Delete"
      confirm-button-type="danger"
      @confirm="deletePet"
    />

    <!-- Status Message -->
    <StatusMessage
      v-model:show="showStatus"
      :message="statusMessage"
      :type="statusType"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePetStore } from "@/stores/petStore";
import ImageUploader from "@/components/ImageUploader.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import StatusMessage from "@/components/StatusMessage.vue";

export default {
  name: "EditPetPage",
  components: {
    ImageUploader,
    ConfirmationModal,
    StatusMessage,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const petStore = usePetStore();

    const petId = computed(() => Number(route.params.id));
    const pet = computed(() => petStore.pets.find((p) => p.id === petId.value));

    const editedPet = ref(pet.value ? { ...pet.value } : null);
    const errors = ref({});
    const isSubmitting = ref(false);
    const showDeleteConfirmation = ref(false);
    const showStatus = ref(false);
    const statusMessage = ref("");
    const statusType = ref("success");

    const validateForm = () => {
      errors.value = {};

      if (!editedPet.value.name || editedPet.value.name.length < 2) {
        errors.value.name = "Name must be at least 2 characters long";
      }

      if (
        !editedPet.value.description ||
        editedPet.value.description.length < 10
      ) {
        errors.value.description =
          "Description must be at least 10 characters long";
      }

      if (!editedPet.value.type) {
        errors.value.type = "Please select a pet type";
      }

      if (
        editedPet.value.age === null ||
        editedPet.value.age < 0 ||
        editedPet.value.age > 30
      ) {
        errors.value.age = "Age must be between 0 and 30 years";
      }

      if (!editedPet.value.image) {
        errors.value.image = "Please provide a pet photo";
      }

      return Object.keys(errors.value).length === 0;
    };

    const showStatusMessage = (message, type) => {
      statusMessage.value = message;
      statusType.value = type;
      showStatus.value = true;
    };

    const validateAndSubmit = async () => {
      if (!validateForm()) {
        showStatusMessage("Please fix the errors in the form", "danger");
        return;
      }

      isSubmitting.value = true;

      try {
        // Update pet in store
        await petStore.updatePet(editedPet.value);
        showStatusMessage("Pet updated successfully!", "success");
        setTimeout(() => {
          router.push({
            name: "PetDetail",
            params: { id: petId.value },
          });
        }, 1500);
      } catch (error) {
        showStatusMessage("Failed to update pet. Please try again.", "danger");
      } finally {
        isSubmitting.value = false;
      }
    };

    const handleImageSelected = (imageData) => {
      editedPet.value.image = imageData.dataUrl;
      errors.value.image = "";
    };

    const handleImageRemoved = () => {
      editedPet.value.image = "";
    };

    const confirmDelete = () => {
      showDeleteConfirmation.value = true;
    };

    const deletePet = async () => {
      try {
        await petStore.deletePet(petId.value);
        showStatusMessage("Pet deleted successfully", "success");
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 1500);
      } catch (error) {
        showStatusMessage("Failed to delete pet. Please try again.", "danger");
      }
    };

    const goBack = () => {
      router.back();
    };

    return {
      pet,
      editedPet,
      errors,
      isSubmitting,
      showDeleteConfirmation,
      showStatus,
      statusMessage,
      statusType,
      validateAndSubmit,
      handleImageSelected,
      handleImageRemoved,
      confirmDelete,
      deletePet,
      goBack,
    };
  },
};
</script>

<style scoped>
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
</style>
