<template>
  <div v-if="pet" class="container my-5">
    <div class="card mx-auto shadow-lg" style="max-width: 600px">
      <img :src="pet.image" class="card-img-top" alt="Pet Photo" />
      <div class="card-body text-center">
        <h2 class="card-title">{{ pet.name }}</h2>
        <p class="card-text text-muted">{{ pet.description }}</p>
        <button class="btn btn-secondary mt-3" @click="goBack">
          Back to List
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center my-5">Loading pet details...</p>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import { onMounted, ref } from "vue";

export default {
  name: "PetDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const petStore = usePetStore();
    const pet = ref(null);

    onMounted(() => {
      pet.value = petStore.pets.find((p) => p.id === parseInt(props.id));
    });

    function goBack() {
      window.history.back();
    }

    return {
      pet,
      goBack,
    };
  },
};
</script>

<style scoped>
.card-img-top {
  max-height: 300px;
  object-fit: cover;
}
</style>
