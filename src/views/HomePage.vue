<template>
  <div class="container text-center my-4">
    <h1 class="display-4 fw-bold">Welcome to AdoptBuddy!</h1>
    <p class="mt-3 fs-5">Platform for finding pets for adoption.</p>
    <div class="row row-cols-1 row-cols-md-3 g-4 mt-5">
      <div class="col" v-for="pet in pets" :key="pet.id">
        <div class="card shadow-sm h-100">
          <img
            :src="pet.image"
            class="card-img-top fixed-image"
            alt="Pet image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ pet.name }}</h5>
            <p class="card-text text-muted">{{ pet.description }}</p>
            <button
              class="btn btn-primary w-100"
              @click="goToPetDetail(pet.id)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";

export default {
  name: "HomePage",
  computed: {
    pets() {
      const petStore = usePetStore();
      return petStore.pets;
    },
  },
  methods: {
    goToPetDetail(petId) {
      this.$router.push({ name: "PetDetail", params: { id: petId } });
    },
  },
};
</script>

<style scoped>
.fixed-image {
  height: 200px;
  object-fit: cover;
}
</style>
