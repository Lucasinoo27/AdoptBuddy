import { computed } from "vue";
import { usePetStore } from "@/stores/petStore";

export function usePetStats() {
  const petStore = usePetStore();

  const totalPets = computed(() => petStore.pets.length);

  const favoritesCount = computed(() => petStore.favoritePets.length);

  const petsByType = computed(() => {
    return petStore.pets.reduce((acc, pet) => {
      acc[pet.type] = (acc[pet.type] || 0) + 1;
      return acc;
    }, {});
  });

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
