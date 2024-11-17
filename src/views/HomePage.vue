<template>
  <div class="container text-center my-4">
    <h1 class="display-4 fw-bold">Welcome to AdoptBuddy!</h1>
    <p class="mt-3 fs-5">Platform for finding pets for adoption.</p>

    <div class="row mt-5">
      <div class="col-md-4 mb-4" v-for="pet in pets" :key="pet.id">
        <div class="card">
          <img :src="pet.image" class="card-img-top" alt="Pet image" />
          <div class="card-body">
            <h5 class="card-title">{{ pet.name }}</h5>
            <p class="card-text">{{ pet.description }}</p>
            <router-link :to="'/pets/' + pet.id" class="btn btn-primary"
              >View Details</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      pets: [
        {
          id: 1,
          name: "Buddy",
          description: "Friendly dog",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Kitty",
          description: "Lovely cat",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Charlie",
          description: "Playful puppy",
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },
};
</script>

<style scoped>
.card-img-top {
  height: 350px;
  object-fit: cover;
}
</style>
