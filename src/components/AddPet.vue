<template>
  <div class="container my-5">
    <h1 class="display-4 fw-bold text-center mb-4">Add a new pet!</h1>
    <form @submit.prevent="submitPet" class="form-container shadow p-4 rounded">
      <!-- Pet Name -->
      <div class="form-outline mb-4">
        <input
          type="text"
          id="petName"
          v-model="pet.name"
          class="form-control"
          placeholder=" "
          required
        />
        <label class="form-label" for="petName">Pet's Name</label>
      </div>

      <!-- Description -->
      <div class="form-outline mb-4">
        <textarea
          id="description"
          v-model="pet.description"
          class="form-control"
          placeholder=" "
          rows="3"
          required
        ></textarea>
        <label class="form-label" for="description">Description</label>
      </div>

      <!-- Image URL -->
      <div class="form-outline mb-4">
        <input
          type="text"
          id="imageURL"
          v-model="pet.image"
          class="form-control"
          placeholder=" "
          required
        />
        <label class="form-label" for="imageURL">Image URL</label>
      </div>

      <!-- Pet Type -->
      <div class="form-outline mb-4">
        <select id="petType" v-model="pet.type" class="form-select" required>
          <option disabled value="">Select pet type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
        </select>
        <label class="form-label" for="petType">Type</label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn btn-primary btn-block w-100"
        data-mdb-ripple-init
      >
        Add Pet
      </button>
    </form>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";

export default {
  name: "AddPet",
  data() {
    return {
      pet: {
        name: "",
        description: "",
        image: "",
        type: "",
      },
    };
  },
  methods: {
    submitPet() {
      const petStore = usePetStore();
      petStore.addPet(this.pet);
      this.pet = { name: "", description: "", image: "", type: "" };
      alert("Pet added successfully!");
      this.$router.push({ name: "Home" });
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
.form-outline .form-control:not(:placeholder-shown) ~ .form-label {
  top: -0.75rem;
  left: 0.5rem;
  color: #0d6efd;
  font-size: 0.8rem;
}

.form-outline .form-control {
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}

.form-outline .form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}
</style>
