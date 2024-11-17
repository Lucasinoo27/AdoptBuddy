<template>
  <div class="container">
    <h2 class="mb-4">Add a New Pet</h2>
    <AddPet />
  </div>
</template>

<script>
import AddPet from "@/components/AddPet.vue";

export default {
  name: "AddPetPage",
  components: { AddPet },
};
</script>
