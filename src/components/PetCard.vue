<template>
  <div class="card shadow-sm h-100">
    <img :src="pet.image" class="card-img-top" alt="Pet image" loading="lazy" />
    <div class="card-body">
      <h5 class="card-title">{{ pet.name }}</h5>
      <p class="card-text">{{ pet.description }}</p>
      <p class="card-text text-muted">Type: {{ pet.type }}</p>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary" @click="viewDetails">
          View Details
        </button>
        <button class="btn btn-warning" @click="editPet">Edit</button>
      </div>

      <!-- Ikona srdca -->
      <div class="favorite-icon mt-3" @click="toggleFavorite">
        <i
          :class="isFavorite ? 'fas fa-heart text-danger' : 'far fa-heart'"
        ></i>
        <span>{{
          isFavorite ? "Added to Favorites" : "Add to Favorites"
        }}</span>
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
  computed: {
    isFavorite() {
      const petStore = usePetStore();
      return petStore.favoritePets.includes(this.pet.id);
    },
  },
  methods: {
    toggleFavorite() {
      const petStore = usePetStore();
      if (this.isFavorite) {
        petStore.favoritePets = petStore.favoritePets.filter(
          (id) => id !== this.pet.id
        );
      } else {
        petStore.favoritePets.push(this.pet.id);
      }
    },
    viewDetails() {
      this.$router.push({ name: "PetDetail", params: { id: this.pet.id } });
    },
    editPet() {
      this.$router.push({ name: "EditPet", params: { id: this.pet.id } });
    },
  },
};
</script>

<style scoped>
.favorite-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
}

.favorite-icon i {
  margin-right: 0.5rem;
}
</style>
