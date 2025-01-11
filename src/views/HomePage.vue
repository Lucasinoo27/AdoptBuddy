<template>
  <div class="container my-4">
    <h1 class="display-4 fw-bold text-center">Find your pet!</h1>

    <div class="row mt-4">
      <!-- Filter Sidebar -->
      <div class="col-md-3">
        <FilterComponent @filter-change="handleFilterChange" />
      </div>

      <!-- Pet Cards Grid -->
      <div class="col-md-9">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <template v-if="filteredAndSortedPets.length">
            <PetCard v-for="pet in paginatedPets" :key="pet.id" :pet="pet" />
          </template>
          <div v-else class="col-12 text-center py-5">
            <p class="text-muted">No pets found matching your criteria.</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-4">
          <PaginationComponent
            :total-items="filteredAndSortedPets.length"
            :current-page="currentPage"
            :items-per-page="itemsPerPage"
            @page-change="handlePageChange"
            @update:items-per-page="handleItemsPerPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import PetCard from "@/components/PetCard.vue";
import FilterComponent from "@/components/FilterComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
  name: "HomePage",
  components: { PetCard, FilterComponent, PaginationComponent },
  data() {
    return {
      filters: {
        searchQuery: "",
        selectedType: "",
        maxAge: 30,
        showFavoritesOnly: false,
        sortBy: "",
      },
      currentPage: 1,
      itemsPerPage: 12,
    };
  },
  computed: {
    pets() {
      const petStore = usePetStore();
      return petStore.pets;
    },
    favoritePets() {
      const petStore = usePetStore();
      return petStore.favoritePets;
    },
    filteredAndSortedPets() {
      let filtered = [...this.pets];

      // Apply name search filter
      if (this.filters.searchQuery) {
        filtered = filtered.filter((pet) =>
          pet.name
            .toLowerCase()
            .includes(this.filters.searchQuery.toLowerCase())
        );
      }

      // Apply type filter
      if (this.filters.selectedType) {
        filtered = filtered.filter(
          (pet) => pet.type === this.filters.selectedType
        );
      }

      // Apply age filter
      filtered = filtered.filter((pet) => pet.age <= this.filters.maxAge);

      // Apply favorites filter
      if (this.filters.showFavoritesOnly) {
        filtered = filtered.filter((pet) => this.favoritePets.includes(pet.id));
      }

      // Apply sorting
      if (this.filters.sortBy) {
        filtered.sort((a, b) => {
          switch (this.filters.sortBy) {
            case "name":
              return a.name.localeCompare(b.name);
            case "age":
              return a.age - b.age;
            case "type":
              return a.type.localeCompare(b.type);
            default:
              return 0;
          }
        });
      }

      return filtered;
    },
    paginatedPets() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAndSortedPets.slice(start, end);
    },
  },
  methods: {
    handleFilterChange(newFilters) {
      this.filters = { ...newFilters };
      this.currentPage = 1; // Reset to first page when filters change
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleItemsPerPageChange(value) {
      this.itemsPerPage = value;
      this.currentPage = 1; // Reset to first page when items per page changes
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
