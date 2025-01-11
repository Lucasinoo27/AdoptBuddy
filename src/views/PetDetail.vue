<template>
  <div class="container my-5" v-if="pet">
    <!-- Back Navigation -->
    <button class="btn btn-link mb-4" @click="goBack">
      <i class="fas fa-arrow-left me-2"></i>Back to pets
    </button>

    <div class="row">
      <!-- Image Section -->
      <div class="col-md-6">
        <div class="position-relative">
          <img
            :src="mainImage"
            class="img-fluid rounded shadow"
            :alt="pet.name"
            @error="setPlaceholderImage"
          />
          <!-- Favorite Button -->
          <button
            class="btn-favorite position-absolute"
            @click="toggleFavorite"
            :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          >
            <i
              class="fas fa-heart fa-2x"
              :class="{ 'text-danger': isFavorite, 'text-muted': !isFavorite }"
            ></i>
          </button>
        </div>
      </div>

      <!-- Pet Information -->
      <div class="col-md-6">
        <div class="pet-info">
          <h1 class="display-4 mb-4">{{ pet.name }}</h1>

          <div class="info-item mb-3">
            <i :class="[getPetIcon(pet.type), 'me-2 text-primary']"></i>
            <span class="fw-bold">Type:</span> {{ pet.type }}
          </div>

          <div class="info-item mb-3">
            <i class="fas fa-birthday-cake me-2 text-primary"></i>
            <span class="fw-bold">Age:</span>
            {{ pet.age }} {{ pet.age === 1 ? "year" : "years" }} old
          </div>

          <div class="info-item mb-4">
            <i class="fas fa-info-circle me-2 text-primary"></i>
            <span class="fw-bold">Description:</span>
            <p class="mt-2">{{ pet.description }}</p>
          </div>

          <button class="btn btn-primary btn-lg">
            <i class="fas fa-paw me-2"></i>Adopt {{ pet.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container my-5 text-center">
    <h2 class="text-muted">Pet not found</h2>
    <button class="btn btn-primary mt-3" @click="goBack">
      Return to pet list
    </button>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import metaTags from "@/mixins/metaTags";

export default {
  name: "PetDetail",
  mixins: [metaTags],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const petStore = usePetStore();

    const petId = computed(() => Number(route.params.id));
    const pet = computed(() => petStore.pets.find((p) => p.id === petId.value));
    const mainImage = ref(pet.value?.image || "/default-placeholder.png");
    const isFavorite = computed(() =>
      petStore.favoritePets.includes(petId.value)
    );

    // Update route meta when pet data changes
    watch(
      pet,
      (newPet) => {
        if (newPet) {
          route.meta.title = `${newPet.name} - ${newPet.type}`;
          route.meta.description = `Meet ${newPet.name}, a ${newPet.age} year old ${newPet.type}. ${newPet.description}`;
          route.meta.keywords = `adopt ${newPet.type.toLowerCase()}, ${newPet.type.toLowerCase()} adoption, pet adoption, ${
            newPet.name
          }`;
          route.meta.image = newPet.image || "/default-placeholder.png";
        }
      },
      { immediate: true }
    );

    const setPlaceholderImage = () => {
      mainImage.value = "/default-placeholder.png";
    };

    const toggleFavorite = () => {
      petStore.toggleFavorite(petId.value);
    };

    const getPetIcon = (type) => {
      switch (type.toLowerCase()) {
        case "dog":
          return "fas fa-dog";
        case "cat":
          return "fas fa-cat";
        case "bird":
          return "fas fa-dove";
        default:
          return "fas fa-paw";
      }
    };

    const goBack = () => {
      router.back();
    };

    return {
      pet,
      mainImage,
      isFavorite,
      setPlaceholderImage,
      toggleFavorite,
      getPetIcon,
      goBack,
    };
  },
};
</script>

<style scoped>
.btn-favorite {
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.btn-favorite:hover {
  transform: scale(1.1);
}

.btn-favorite i {
  transition: all 0.2s ease;
}

.info-item {
  font-size: 1.1rem;
}

.pet-info {
  padding: 1rem;
}

@media (min-width: 768px) {
  .pet-info {
    padding: 0 1rem;
  }
}
</style>
