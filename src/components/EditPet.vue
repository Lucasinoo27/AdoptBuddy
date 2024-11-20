<template>
  <div class="container my-5">
    <h1 class="display-4 text-center mb-4">Edit Pet</h1>
    <form @submit.prevent="submitEdit">
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
      <button type="submit" class="btn btn-success w-100">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "EditPet",
  setup() {
    const petStore = usePetStore();
    const router = useRouter();
    const route = useRoute();
    const petId = route.params.id;
    const pet = ref({ ...petStore.pets.find((p) => p.id === +petId) });

    const submitEdit = () => {
      const index = petStore.pets.findIndex((p) => p.id === +petId);
      petStore.pets[index] = pet.value;
      alert("Pet updated successfully!");
      router.push({ name: "Home" });
    };

    return {
      pet,
      submitEdit,
    };
  },
};
</script>

<style></style>
