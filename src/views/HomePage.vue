<template>
  <div class="container text-center my-4">
    <h1 class="display-4 fw-bold">Find your pet!</h1>

    <!-- Buttons for toggling filters and sorting -->
    <div class="d-flex justify-content-end my-4">
      <button class="btn btn-primary me-2" @click="showFilter = !showFilter">
        {{ showFilter ? "Hide Filter" : "Show Filter" }}
      </button>
      <button class="btn btn-secondary" @click="showSorting = !showSorting">
        {{ showSorting ? "Hide Sorting" : "Show Sorting" }}
      </button>
    </div>

    <!-- Filter Section -->
    <div v-if="showFilter" class="my-4 border p-3 rounded">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control mb-3"
        placeholder="Search for a pet..."
      />
      <select v-model="selectedType" class="form-select mb-3">
        <option value="">All</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Bird">Bird</option>
      </select>
    </div>

    <!-- Sorting Section -->
    <div v-if="showSorting" class="my-4 border p-3 rounded">
      <select v-model="selectedSort" class="form-select">
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="type">Type</option>
      </select>
    </div>

    <!-- Pet Cards -->
    <div class="row row-cols-1 row-cols-md-3 g-4 mt-5">
      <PetCard v-for="pet in sortedPets" :key="pet.id" :pet="pet" />
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
      selectedSort: "",
      showFilter: false,
      showSorting: false,
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
    sortedPets() {
      if (this.selectedSort === "name") {
        return [...this.filteredPets].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (this.selectedSort === "type") {
        return [...this.filteredPets].sort((a, b) =>
          a.type.localeCompare(b.type)
        );
      }
      return this.filteredPets;
    },
  },
};
</script>

<style>
.border {
  border: 1px solid #ccc;
  background-color: #f8f9fa;
}
</style>
