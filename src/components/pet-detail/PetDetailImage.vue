<template>
  <div class="position-relative rounded-4 overflow-hidden shadow-lg">
    <img
      :src="image"
      class="w-100 h-auto d-block"
      :alt="petName"
      @error="handleImageError"
    />
    <!-- Favorite Button -->
    <button
      class="btn-favorite"
      @click="$emit('favorite-toggle')"
      :class="{ 'is-favorite': isFavorite }"
      :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <div class="heart-container">
        <i class="fa-heart" :class="[isFavorite ? 'fas' : 'far']"></i>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "PetDetailImage",
  props: {
    image: {
      type: String,
      required: true,
    },
    petName: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
    defaultImage: {
      type: String,
      required: true,
    },
  },
  emits: ["favorite-toggle", "image-error"],
  methods: {
    handleImageError() {
      this.$emit("image-error");
    },
  },
};
</script>

<style scoped>
/* Favorite Button - Custom design and animation */
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
</style>
