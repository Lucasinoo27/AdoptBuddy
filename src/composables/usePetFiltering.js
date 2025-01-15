/**
 * Pet Filtering and Pagination Composable
 *
 * Handles the filtering, sorting, and pagination of pets in the application.
 * Key features:
 * - Text search by pet name
 * - Filter by pet type and age
 * - Show favorites only
 * - Sorting by name, age, or type
 * - Pagination with configurable items per page
 */

import { ref, computed } from "vue";
import { usePetStore } from "@/stores/petStore";

// Manages pet filtering, sorting, and pagination functionality
export function usePetFiltering() {
  const petStore = usePetStore();

  // Default filter state with initial values
  const filters = ref({
    searchQuery: "",
    selectedType: "",
    maxAge: 30,
    showFavoritesOnly: false,
    sortBy: "",
  });

  // Pagination state
  const currentPage = ref(1);
  const itemsPerPage = ref(12);

  // Applies all active filters and sorting to the pet list
  const filteredAndSortedPets = computed(() => {
    let filtered = [...petStore.pets];

    // Apply name search filter
    if (filters.value.searchQuery) {
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(filters.value.searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.value.selectedType) {
      filtered = filtered.filter(
        (pet) => pet.type === filters.value.selectedType
      );
    }

    // Apply age filter
    filtered = filtered.filter((pet) => pet.age <= filters.value.maxAge);

    // Apply favorites filter
    if (filters.value.showFavoritesOnly) {
      filtered = filtered.filter((pet) =>
        petStore.favoritePets.includes(pet.id)
      );
    }

    // Apply sorting
    if (filters.value.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.value.sortBy) {
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
  });

  // Gets the subset of pets for the current page
  const paginatedPets = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredAndSortedPets.value.slice(start, end);
  });

  // Updates the current filter settings and resets pagination
  const handleFilterChange = (newFilters) => {
    filters.value = { ...newFilters };
    currentPage.value = 1;
  };

  // Changes the current page of results being displayed
  const handlePageChange = (page) => {
    currentPage.value = page;
  };

  // Updates how many pets are shown per page
  const handleItemsPerPageChange = (value) => {
    itemsPerPage.value = value;
    currentPage.value = 1;
  };

  // Filters the list to show only favorited pets
  const showFavorites = () => {
    filters.value.showFavoritesOnly = true;
    currentPage.value = 1;
  };

  return {
    filters,
    currentPage,
    itemsPerPage,
    filteredAndSortedPets,
    paginatedPets,
    handleFilterChange,
    handlePageChange,
    handleItemsPerPageChange,
    showFavorites,
  };
}
