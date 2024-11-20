<template>
  <div class="pet-card">
    <img :src="pet.photo" alt="Pet Image" />
    <h3>{{ pet.name }}</h3>
    <p>{{ pet.breed }}</p>
    <button @click="viewDetails">View Details</button>
  </div>
</template>

<script>
export default {
  name: "PetCard",
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewDetails() {
      this.$router.push({ name: "PetDetail", params: { id: this.pet.id } });
    },
  },
};
</script>

<style scoped>
.pet-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  margin: 10px;
}
.pet-card img {
  max-width: 100%;
  height: auto;
}
</style>
