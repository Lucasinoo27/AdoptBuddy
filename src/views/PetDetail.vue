<template>
  <div class="container my-5">
    <div class="row">
      <!-- Galéria obrázkov -->
      <div class="col-md-6">
        <img
          :src="mainImage"
          class="img-fluid"
          alt="Pet image"
          @error="setPlaceholderImage"
        />
        <div class="gallery mt-3">
          <img
            v-for="(img, index) in pet.gallery"
            :key="index"
            :src="img"
            class="img-thumbnail"
            @click="changeMainImage(img)"
            @error="setPlaceholderGalleryImage(index)"
          />
        </div>
      </div>

      <div class="col-md-6">
        <h1>{{ pet.name }}</h1>
        <p><strong>Type:</strong> {{ pet.type }}</p>
        <p><strong>Age:</strong> {{ pet.age }}</p>
        <p><strong>Description:</strong> {{ pet.description }}</p>
        <p><strong>Location:</strong> {{ pet.location }}</p>

        <button class="btn btn-success mt-3">Adopt {{ pet.name }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { usePetStore } from "@/stores/petStore";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "PetDetail",
  setup() {
    const route = useRoute();
    const petStore = usePetStore();
    const petId = computed(() => Number(route.params.id));
    const pet = computed(() => petStore.pets.find((p) => p.id === petId.value));
    const mainImage = ref(pet.value?.image || "/default-placeholder.png");

    const changeMainImage = (img) => {
      mainImage.value = img;
    };

    const setPlaceholderImage = () => {
      mainImage.value = "/default-placeholder.png";
    };

    const setPlaceholderGalleryImage = (index) => {
      pet.value.gallery[index] = "/default-placeholder.png";
    };

    return {
      pet,
      mainImage,
      changeMainImage,
      setPlaceholderImage,
      setPlaceholderGalleryImage,
    };
  },
};
</script>

<style scoped>
.gallery {
  display: flex;
  gap: 10px;
}

.gallery img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.gallery img:hover {
  transform: scale(1.1);
}
</style>
