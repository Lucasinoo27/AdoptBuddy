<template>
  <div>
    <form @submit.prevent="submitPet">
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
      <button type="submit" class="btn btn-primary">Add Pet</button>
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

      // Resetovanie formulára
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
