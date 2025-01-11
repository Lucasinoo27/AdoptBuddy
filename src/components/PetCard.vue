<template>
  <div class="card pet-card shadow-sm h-100">
    <!-- Action Buttons -->
    <div class="action-buttons position-absolute">
      <button
        class="favorite-button"
        @click.stop="handleFavoriteClick"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        :class="{ 'is-favorite': isFavorite }"
      >
        <i
          class="fa-heart"
          :class="[isFavorite ? 'fas' : 'far']"
          aria-hidden="true"
        ></i>
        <span class="visually-hidden">
          {{ isFavorite ? "Remove from favorites" : "Add to favorites" }}
        </span>
      </button>
      <button
        class="btn-action btn-delete"
        @click.stop="showDeleteConfirmation"
        title="Delete pet"
      >
        <i class="fas fa-trash text-danger"></i>
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

  <!-- Delete Confirmation Modal -->
  <ConfirmationModal
    v-model:show="showDeleteModal"
    type="delete"
    :itemName="pet.name"
    @confirm="handleDelete"
  />
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import ConfirmationModal from "./ConfirmationModal.vue";

export default {
  name: "PetCard",
  components: {
    ConfirmationModal,
  },
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageSrc: this.pet.image || "/default-placeholder.png",
      isIntersecting: false,
      isLoading: true,
      observer: null,
      showDeleteModal: false,
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
      if (!this.isIntersecting) {
        return "/default-placeholder.png";
      }
      return this.imageLoadError ? "/default-placeholder.png" : this.imageSrc;
    },
  },
  watch: {
    "pet.image": {
      handler(newImage) {
        if (newImage && newImage !== this.imageSrc) {
          this.imageSrc = newImage;
          this.imageLoadError = false;
          this.isLoading = true;
        }
      },
      immediate: true,
    },
  },
  methods: {
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
      this.imageSrc = "/default-placeholder.png";
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
        // Once the image is loaded, we can stop observing
        this.observer.unobserve(entry.target);
      }
    },
    showDeleteConfirmation() {
      this.showDeleteModal = true;
    },
    async handleDelete() {
      try {
        const petStore = usePetStore();
        await petStore.deletePet(this.pet.id);
      } catch (error) {
        console.error("Failed to delete pet:", error);
      }
    },
  },
  mounted() {
    // Initialize Intersection Observer with larger rootMargin for earlier loading
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
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
  transition: transform 0.2s;
  background-color: #f8f9fa;
  position: relative;
}

.pet-card:hover {
  transform: scale(1.02);
}

.action-buttons {
  top: 10px;
  right: 10px;
  z-index: 20;
  display: flex;
  gap: 8px;
}

.favorite-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.favorite-button i {
  font-size: 1.5rem;
  color: #ffffff;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.favorite-button:hover {
  transform: scale(1.15);
}

.favorite-button:hover i {
  color: #ff4081;
}

.favorite-button.is-favorite i {
  color: #ff4081;
  animation: heartPop 0.3s ease-out;
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
  height: 200px;
  overflow: hidden;
  border-radius: 0.5rem;
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
  filter: brightness(0.7);
  transition: opacity 0.3s ease;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  opacity: 0;
}

.card-img-container:hover .overlay {
  opacity: 1;
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
  font-size: 1.5rem;
  font-weight: bold;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}
</style>
