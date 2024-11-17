<template>
  <div class="container text-center my-4">
    <h1 class="display-4 fw-bold">Welcome to AdoptBuddy!</h1>
    <p class="mt-3 fs-5">Platform for finding pets for adoption.</p>
    <div class="row mt-5">
      <div class="col-md-4 mb-4" v-for="pet in pets" :key="pet.id">
        <div class="card">
          <img
            :src="pet.image"
            class="card-img-top fixed-image"
            alt="Pet image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ pet.name }}</h5>
            <p class="card-text">{{ pet.description }}</p>
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
};
</script>

<style scoped>
.fixed-image {
  height: 500px;
  width: 100%;
  object-fit: cover;
}
</style>
