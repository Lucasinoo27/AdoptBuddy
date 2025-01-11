<template>
  <div class="card pet-card shadow-sm h-100">
    <!-- Favorite Button -->
    <button
      class="btn-favorite position-absolute"
      @click.stop="toggleFavorite"
      :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <i
        class="fas fa-heart"
        :class="{ 'text-danger': isFavorite, 'text-muted': !isFavorite }"
      ></i>
    </button>

    <!-- Pet Image with Overlay -->
    <div class="card-img-container position-relative" @click="viewDetails">
      <img
        :src="imageSrc"
        class="card-img-top pet-img"
        :alt="`${pet.name} - ${pet.type}`"
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
      this.imageSrc = "/default-placeholder.png"; // Fallback image if the URL is invalid
    },
    viewDetails() {
      this.$router.push({ name: "PetDetail", params: { id: this.pet.id } });
    },
    toggleFavorite() {
      const petStore = usePetStore();
      petStore.toggleFavorite(this.pet.id);
    },
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

.btn-favorite {
  top: 10px;
  right: 10px;
  z-index: 20;
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

.btn-favorite:hover {
  transform: scale(1.1);
}

.btn-favorite i {
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.card-img-container {
  cursor: pointer;
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
