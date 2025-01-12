import { ref, computed } from "vue";
import { usePetStore } from "@/stores/petStore";

export function usePetFiltering() {
  const petStore = usePetStore();

  const filters = ref({
    searchQuery: "",
    selectedType: "",
    maxAge: 30,
    showFavoritesOnly: false,
    sortBy: "",
  });

  const currentPage = ref(1);
  const itemsPerPage = ref(12);

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

  const paginatedPets = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredAndSortedPets.value.slice(start, end);
  });

  const handleFilterChange = (newFilters) => {
    filters.value = { ...newFilters };
    currentPage.value = 1;
  };

  const handlePageChange = (page) => {
    currentPage.value = page;
  };

  const handleItemsPerPageChange = (value) => {
    itemsPerPage.value = value;
    currentPage.value = 1;
  };

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
