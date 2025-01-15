/**
 * Pet Statistics Composable
 *
 * Provides computed statistics and utility functions for pet data.
 * Key features:
 * - Total pets count
 * - Favorites count tracking
 * - Pet distribution by type
 * - Pet type icon mapping
 */

import { computed } from "vue";
import { usePetStore } from "@/stores/petStore";

// Provides statistics and utility functions for analyzing pet data
export function usePetStats() {
  const petStore = usePetStore();

  // Calculates the total number of pets in the system
  const totalPets = computed(() => petStore.pets.length);

  // Tracks how many pets have been marked as favorites
  const favoritesCount = computed(() => petStore.favoritePets.length);

  // Creates a breakdown of how many pets exist of each type
  const petsByType = computed(() => {
    return petStore.pets.reduce((acc, pet) => {
      acc[pet.type] = (acc[pet.type] || 0) + 1;
      return acc;
    }, {});
  });

  // Maps pet types to their corresponding Font Awesome icon classes
  const getPetTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "dog":
        return "fas fa-dog";
      case "cat":
        return "fas fa-cat";
      case "bird":
        return "fas fa-dove";
      case "rabbit":
        return "fas fa-paw";
      default:
        return "fas fa-paw";
    }
  };

  return {
    totalPets,
    favoritesCount,
    petsByType,
    getPetTypeIcon,
  };
}
