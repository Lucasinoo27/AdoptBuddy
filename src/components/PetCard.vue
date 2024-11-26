<template>
  <div class="card pet-card shadow-sm h-100" @click="viewDetails">
    <!-- Pet Image with Overlay -->
    <div class="card-img-container position-relative">
      <img
        :src="imageSrc"
        class="card-img-top pet-img"
        alt="Pet image"
        loading="lazy"
        @error="handleImageError"
      />
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
      imageSrc: this.pet.image || "default-placeholder.png", // Default image
    };
  },
  computed: {
    isFavorite() {
      const petStore = usePetStore();
      return petStore.favoritePets.includes(this.pet.id);
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
      this.imageSrc = "default-placeholder.png"; // Fallback image if the URL is invalid
    },
    viewDetails() {
      this.$router.push({ name: "PetDetail", params: { id: this.pet.id } });
    },
  },
};
</script>

<style scoped>
.pet-card {
  border: none;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: #f8f9fa; /* Light grey background for empty cards */
}

.pet-card:hover {
  transform: scale(1.02);
}

.card-img-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 0.5rem;
}

.pet-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  filter: brightness(0.7);
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
</style>
