<template>
  <div class="container text-center my-4">
    <h1 class="display-4 fw-bold">Welcome to AdoptBuddy!</h1>
    <p class="mt-3 fs-5">Platform for finding pets for adoption.</p>
    <div class="my-4">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Search for a pet..."
      />
    </div>

    <div class="my-4">
      <select v-model="selectedType" class="form-select">
        <option value="">All</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Bird">Bird</option>
      </select>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4 mt-5">
      <PetCard v-for="pet in filteredPets" :key="pet.id" :pet="pet" />
    </div>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import PetCard from "@/components/PetCard.vue";

export default {
  name: "HomePage",
  components: { PetCard },
  data() {
    return {
      searchQuery: "",
      selectedType: "",
    };
  },
  computed: {
    pets() {
      const petStore = usePetStore();
      return petStore.pets;
    },
    filteredPets() {
      return this.pets
        .filter((pet) =>
          pet.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .filter((pet) =>
          this.selectedType ? pet.type === this.selectedType : true
        );
    },
  },
};
</script>

<style></style>
