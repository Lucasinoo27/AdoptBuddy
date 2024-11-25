<template>
  <div class="container my-5">
    <h1 class="display-4 fw-bold text-center">Add a new pet!</h1>
    <form @submit.prevent="submitPet">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          id="name"
          v-model="pet.name"
          class="form-control"
          placeholder="Enter pet's name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="pet.description"
          class="form-control"
          placeholder="Enter a description"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image URL</label>
        <input
          type="text"
          id="image"
          v-model="pet.image"
          class="form-control"
          placeholder="Enter image URL"
          required
        />
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">Type</label>
        <select id="type" v-model="pet.type" class="form-select" required>
          <option disabled value="">Select pet type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary w-100">Add Pet</button>
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

<style></style>
