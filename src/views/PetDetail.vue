<template>
  <div class="overflow-hidden" v-if="pet">
    <!-- Back Navigation -->
    <div class="container py-3">
      <button
        class="btn-back fw-semibold"
        @click="goBack"
        data-aos="fade-right"
      >
        <i class="fas fa-arrow-left me-2"></i>Back to pets
      </button>
    </div>

    <!-- Hero Section -->
    <section class="hero-section py-4 py-lg-6">
      <div class="container">
        <div class="row align-items-center g-4">
          <!-- Image Section -->
          <div class="col-lg-6" data-aos="fade-right">
            <PetDetailImage
              :image="mainImage"
              :pet-name="pet.name"
              :is-favorite="isFavorite"
              :default-image="defaultImage"
              @favorite-toggle="toggleFavorite"
              @image-error="handleImageError"
            />
          </div>

          <!-- Pet Information -->
          <div class="col-lg-6" data-aos="fade-left">
            <PetDetailInfo
              :pet-name="pet.name"
              :pet-type="pet.type"
              :age="pet.age"
              :description="pet.description"
              @adopt-click="handleAdopt"
            />
          </div>
        </div>
      </div>
    </section>

    <PetDetailBenefits :pet-name="pet.name" />
    <PetDetailCTA :pet-name="pet.name" @adopt-click="handleAdopt" />
  </div>

  <!-- Not Found State -->
  <div v-else class="container my-5 text-center">
    <div class="mx-auto py-5" style="max-width: 500px" data-aos="fade-up">
      <i class="fas fa-search fa-3x mb-4 text-muted"></i>
      <h2 class="display-6 fw-bold mb-4">Pet Not Found</h2>
      <p class="text-muted mb-4">
        We couldn't find the pet you're looking for. They might have already
        found their forever home!
      </p>
      <button class="btn btn-primary" @click="goBack">
        <i class="fas fa-arrow-left me-2"></i>
        Return to Pet List
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePetStore } from "@/stores/petStore";
import { usePetImage } from "@/composables/usePetImage";

import PetDetailImage from "@/components/pet-detail/PetDetailImage.vue";
import PetDetailInfo from "@/components/pet-detail/PetDetailInfo.vue";
import PetDetailBenefits from "@/components/pet-detail/PetDetailBenefits.vue";
import PetDetailCTA from "@/components/pet-detail/PetDetailCTA.vue";

export default {
  name: "PetDetail",
  components: {
    PetDetailImage,
    PetDetailInfo,
    PetDetailBenefits,
    PetDetailCTA,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const petStore = usePetStore();
    const defaultImage = process.env.BASE_URL + "default-placeholder.png";

    const petId = computed(() => Number(route.params.id));
    const pet = computed(() => petStore.pets.find((p) => p.id === petId.value));
    const isFavorite = computed(() =>
      petStore.favoritePets.includes(petId.value)
    );

    const { mainImage, handleImageError, updateImage } = usePetImage(
      pet.value?.image,
      defaultImage
    );

    // Watch for pet changes to update image
    if (pet.value) {
      updateImage(pet.value.image);
    }

    const toggleFavorite = () => {
      petStore.toggleFavorite(petId.value);
    };

    const handleAdopt = () => {
      // TODO: Implement adoption process
      alert(`Starting adoption process for ${pet.value.name}`);
    };

    const goBack = () => {
      router.back();
    };

    return {
      pet,
      mainImage,
      defaultImage,
      isFavorite,
      handleImageError,
      toggleFavorite,
      handleAdopt,
      goBack,
    };
  },
};
</script>

<style scoped>
/* Back Button - Custom hover animation */
.btn-back {
  background: none;
  border: none;
  color: #6366f1;
  transition: all 0.3s ease;
}

.btn-back:hover {
  transform: translateX(-5px);
  color: #4f46e5;
}

/* Hero Section - Custom gradient */
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}
</style>
