<template>
  <div class="container my-5">
    <form class="card p-4 shadow" @submit.prevent="submitPet">
      <h2 class="mb-4 text-center">Add a New Pet</h2>
      <div class="mb-3">
        <label for="name" class="form-label">Pet Name</label>
        <input
          type="text"
          id="name"
          class="form-control"
          v-model="pet.name"
          placeholder="Enter the pet's name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          class="form-control"
          v-model="pet.description"
          placeholder="Enter a description for the pet"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image URL</label>
        <input
          type="url"
          id="image"
          class="form-control"
          v-model="pet.image"
          placeholder="Enter an image URL"
          required
        />
      </div>
      <button type="submit" class="btn btn-success w-100">Add Pet</button>
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
      },
    };
  },
  methods: {
    submitPet() {
      const petStore = usePetStore();

      petStore.addPet(this.pet);

      this.pet = {
        name: "",
        description: "",
        image: "",
      };

      alert("Pet added successfully!");
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
