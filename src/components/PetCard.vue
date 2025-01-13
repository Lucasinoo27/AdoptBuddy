<template>
  <div class="card pet-card shadow-sm h-100">
    <!-- Modern Favorite Button -->
    <div class="favorite-button-wrapper position-absolute">
      <button
        class="favorite-button"
        @click.stop="handleFavoriteClick"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        :class="{ 'is-favorite': isFavorite, animate: isAnimating }"
      >
        <div class="heart-container">
          <!-- Heart Background for Glow Effect -->
          <div class="heart-bg"></div>
          <!-- Main Heart Icon -->
          <div class="heart-main">
            <i
              class="fa-heart"
              :class="[isFavorite ? 'fas' : 'far']"
              aria-hidden="true"
            ></i>
          </div>
          <!-- Ripple Effect Container -->
          <div class="ripple" v-if="isAnimating"></div>
        </div>
        <span class="visually-hidden">
          {{ isFavorite ? "Remove from favorites" : "Add to favorites" }}
        </span>
      </button>
    </div>

    <!-- Pet Image with Overlay -->
    <div class="card-img-container position-relative" @click="viewDetails">
      <div class="image-wrapper" :class="{ loading: !isIntersecting }">
        <img
          :src="currentImageSrc"
          :data-src="imageSrc"
          class="card-img-top pet-img"
          :alt="`${pet.name} - ${pet.type}`"
          @error="handleImageError"
          @load="handleImageLoad"
          ref="image"
        />
        <div v-if="!isIntersecting || isLoading" class="placeholder-overlay">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <!-- Always Visible Pet Name -->
      <div class="pet-name-always position-absolute w-100 text-center">
        <h5 class="pet-name">{{ pet.name }}</h5>
      </div>
      <!-- Hover Overlay -->
      <div class="overlay position-absolute top-0 start-0 w-100 h-100">
        <div
          class="pet-info text-white d-flex flex-column justify-content-end p-3"
        >
          <div class="pet-type">
            <i :class="getPetIcon(pet.type)" class="me-2"></i>
            <span>{{ pet.type }}</span>
          </div>
          <p class="pet-description text-truncate">{{ pet.description }}</p>
          <div class="pet-age mt-1">
            <i class="fas fa-birthday-cake me-2"></i>
            <span
              >{{ pet.age }} {{ pet.age === 1 ? "year" : "years" }} old</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
export default {
  name: "PetCard",
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageSrc: this.getImagePath(this.pet.image),
      isIntersecting: false,
      isLoading: true,
      observer: null,
      imageLoadError: false,
      isAnimating: false,
    };
  },
  computed: {
    isFavorite() {
      const petStore = usePetStore();
      return petStore.favoritePets.includes(this.pet.id);
    },
    currentImageSrc() {
      const defaultImage = process.env.BASE_URL + "default-placeholder.png";
      if (!this.isIntersecting || this.isLoading) {
        return defaultImage;
      }
      return this.imageLoadError ? defaultImage : this.imageSrc;
    },
    isDataUrl() {
      return this.pet.image?.startsWith("data:");
    },
  },
  watch: {
    "pet.image": {
      handler(newImage) {
        if (newImage && newImage !== this.imageSrc) {
          this.imageSrc = this.getImagePath(newImage);
          this.imageLoadError = false;
          this.isLoading = true;
        }
      },
      immediate: true,
    },
  },
  methods: {
    getImagePath(image) {
      const defaultImage = process.env.BASE_URL + "default-placeholder.png";
      if (!image) return defaultImage;
      // If it's a data URL (uploaded image), use it directly
      if (image.startsWith("data:")) return image;
      // For other paths, ensure proper base URL
      return image.startsWith("/")
        ? process.env.BASE_URL + image.slice(1)
        : process.env.BASE_URL + image;
    },
    getPetIcon(type) {
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
    },
    handleImageError() {
      this.imageLoadError = true;
      this.isLoading = false;
      this.imageSrc = process.env.BASE_URL + "default-placeholder.png";
    },
    handleImageLoad() {
      this.isLoading = false;
      this.imageLoadError = false;
    },
    viewDetails() {
      this.$router.push({ name: "PetDetail", params: { id: this.pet.id } });
    },
    handleFavoriteClick() {
      const petStore = usePetStore();
      petStore.toggleFavorite(this.pet.id);

      // Add animation flag
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    },
    handleIntersection(entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.isIntersecting = true;
        // Reset loading state when intersection occurs
        this.isLoading = true;
        // Load the image immediately
        if (this.$refs.image) {
          this.$refs.image.src = this.imageSrc;
        }
        // Once the image is loaded, we can stop observing
        this.observer.unobserve(entry.target);
      }
    },
  },
  mounted() {
    // Initialize Intersection Observer with much larger rootMargin and lower threshold
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      rootMargin: "500px",
      threshold: 0.01,
    });

    if (this.$refs.image) {
      this.observer.observe(this.$refs.image);
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

<style scoped>
.pet-card {
  border: none;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #ffffff;
  position: relative;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.pet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.favorite-button-wrapper {
  top: 16px;
  right: 16px;
  z-index: 20;
}

.favorite-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px;
  cursor: pointer;
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.heart-container {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 64, 129, 0.2) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: all 0.3s ease;
}

.heart-main {
  position: relative;
  z-index: 2;
}

.favorite-button i {
  font-size: 1.75rem;
  background: linear-gradient(45deg, #ff4081, #ff6e7f);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.85;
  transform-origin: center;
}

.favorite-button:hover {
  transform: translateY(-2px) scale(1.05);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.favorite-button:hover i {
  opacity: 1;
  transform: scale(1.1);
}

.favorite-button:hover .heart-bg {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}

.favorite-button.is-favorite {
  background: rgba(255, 255, 255, 0.95);
}

.favorite-button.is-favorite i {
  opacity: 1;
  background: linear-gradient(45deg, #ff4081, #ff6e7f);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(255, 64, 129, 0.3));
}

.favorite-button.is-favorite .heart-bg {
  opacity: 1;
  background: radial-gradient(
    circle at center,
    rgba(255, 64, 129, 0.3) 0%,
    transparent 70%
  );
}

.favorite-button.animate .heart-main {
  animation: heartPop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ripple effect */
.ripple {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(255, 64, 129, 0.4) 0%,
    transparent 50%
  );
  border-radius: 50%;
  animation: rippleEffect 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes rippleEffect {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes heartPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.btn-action {
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.btn-action:hover {
  transform: scale(1.1);
}

.btn-action i {
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.card-img-container {
  cursor: pointer;
  position: relative;
  height: 240px;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
  background-color: #f8f9fa;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.placeholder-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
}

.image-wrapper.loading .pet-img {
  opacity: 0.5;
}

.pet-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  filter: brightness(0.85);
  transition: all 0.3s ease;
}

.card-img-container:hover .pet-img {
  transform: scale(1.05);
  filter: brightness(0.7);
}

.overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
}

.card-img-container:hover .overlay {
  opacity: 1;
}

.pet-info {
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.card-img-container:hover .pet-info {
  transform: translateY(0);
}

.pet-info {
  color: #fff;
}

.pet-type {
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.pet-description {
  font-size: 0.875rem;
  font-style: italic;
}

/* Always visible pet name */
.pet-name-always {
  top: 10px;
  left: 0;
  z-index: 10;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}

.pet-name {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.pet-description {
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.pet-type,
.pet-age {
  font-size: 0.9rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}
</style>
