<template>
  <div class="pet-detail-page" v-if="pet">
    <!-- Back Navigation -->
    <div class="container py-3">
      <button class="btn-back" @click="goBack" data-aos="fade-right">
        <i class="fas fa-arrow-left me-2"></i>Back to pets
      </button>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center g-4">
          <!-- Image Section -->
          <div class="col-lg-6" data-aos="fade-right">
            <div class="image-wrapper">
              <img
                :src="mainImage"
                class="pet-image"
                :alt="pet.name"
                @error="setPlaceholderImage"
              />
              <!-- Favorite Button -->
              <button
                class="btn-favorite"
                @click="toggleFavorite"
                :class="{ 'is-favorite': isFavorite }"
                :title="
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                "
              >
                <div class="heart-container">
                  <i class="fa-heart" :class="[isFavorite ? 'fas' : 'far']"></i>
                </div>
              </button>
            </div>
          </div>

          <!-- Pet Information -->
          <div class="col-lg-6" data-aos="fade-left">
            <div class="pet-info">
              <h1 class="pet-name">{{ pet.name }}</h1>

              <div class="info-cards">
                <div class="info-card" data-aos="fade-up" data-aos-delay="100">
                  <div class="info-icon">
                    <i :class="getPetIcon(pet.type)"></i>
                  </div>
                  <div class="info-content">
                    <h3>Type</h3>
                    <p>{{ pet.type }}</p>
                  </div>
                </div>

                <div class="info-card" data-aos="fade-up" data-aos-delay="200">
                  <div class="info-icon">
                    <i class="fas fa-birthday-cake"></i>
                  </div>
                  <div class="info-content">
                    <h3>Age</h3>
                    <p>
                      {{ pet.age }} {{ pet.age === 1 ? "year" : "years" }} old
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="description-card"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3>About {{ pet.name }}</h3>
                <p>{{ pet.description }}</p>
              </div>

              <button class="btn-adopt" data-aos="fade-up" data-aos-delay="400">
                <i class="fas fa-paw me-2"></i>
                Adopt {{ pet.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Adopt Section -->
    <section class="why-adopt-section">
      <div class="container">
        <h2 class="section-title text-center" data-aos="fade-up">
          Why Adopt {{ pet.name }}?
        </h2>
        <div class="row g-4">
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>Give a Home</h3>
              <p>Provide a loving forever home to a pet in need</p>
            </div>
          </div>
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-hands-helping"></i>
              </div>
              <h3>Support</h3>
              <p>Get guidance and support throughout the adoption process</p>
            </div>
          </div>
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Health Checked</h3>
              <p>All our pets are health-checked and behavior-assessed</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section text-center">
      <div class="container">
        <div class="cta-content" data-aos="zoom-in">
          <h2 class="mb-4">Ready to Welcome {{ pet.name }} Home?</h2>
          <p class="mb-4">
            Start your adoption journey today and give {{ pet.name }} the loving
            home they deserve.
          </p>
          <button class="btn-adopt btn-lg">
            <i class="fas fa-paw me-2"></i>
            Start Adoption Process
          </button>
        </div>
      </div>
    </section>
  </div>

  <!-- Not Found State -->
  <div v-else class="container my-5 text-center">
    <div class="not-found-content" data-aos="fade-up">
      <i class="fas fa-search fa-3x mb-4 text-muted"></i>
      <h2 class="mb-4">Pet Not Found</h2>
      <p class="text-muted mb-4">
        We couldn't find the pet you're looking for. They might have already
        found their forever home!
      </p>
      <button class="btn-primary" @click="goBack">
        <i class="fas fa-arrow-left me-2"></i>
        Return to Pet List
      </button>
    </div>
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
.pet-detail-page {
  overflow-x: hidden;
}

/* Back Button */
.btn-back {
  background: none;
  border: none;
  color: #6366f1;
  font-weight: 600;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.btn-back:hover {
  transform: translateX(-5px);
  color: #4f46e5;
}

/* Hero Section */
.hero-section {
  padding: 2rem 0 6rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.image-wrapper {
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.pet-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Favorite Button */
.btn-favorite {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
}

.btn-favorite:hover {
  transform: scale(1.1);
  background: white;
}

.btn-favorite i {
  font-size: 1.75rem;
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.btn-favorite:hover i {
  opacity: 1;
}

.btn-favorite.is-favorite i {
  opacity: 1;
}

/* Pet Info */
.pet-info {
  padding: 2rem;
}

.pet-name {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon i {
  font-size: 1.25rem;
  color: white;
}

.info-content h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-content p {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.description-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.description-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.description-card p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Why Adopt Section */
.why-adopt-section {
  padding: 6rem 0;
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 3rem;
}

.benefit-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.benefit-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.benefit-icon i {
  font-size: 1.5rem;
  color: white;
}

.benefit-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.benefit-card p {
  color: #6b7280;
  margin: 0;
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.btn-adopt {
  background: white;
  color: #6366f1;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.btn-adopt:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: #4f46e5;
}

/* Not Found State */
.not-found-content {
  max-width: 500px;
  margin: 0 auto;
  padding: 4rem 0;
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .pet-name {
    font-size: 3rem;
  }

  .hero-section {
    padding: 2rem 0 4rem;
  }
}

@media (max-width: 767.98px) {
  .pet-name {
    font-size: 2.5rem;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }

  .benefit-card {
    margin-bottom: 1rem;
  }
}
</style>
