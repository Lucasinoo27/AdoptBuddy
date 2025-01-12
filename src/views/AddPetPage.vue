<template>
  <div class="add-pet-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="page-header text-center mb-5" data-aos="fade-up">
            <h1 class="display-4 fw-bold mb-3">Add a New Pet</h1>
            <p class="text-muted lead">
              Help a pet find their forever home by listing them on AdoptBuddy
            </p>
          </div>
          <AddPet />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddPet from "@/components/AddPet.vue";

export default {
  name: "AddPetPage",
  components: { AddPet },
};
</script>

<style scoped>
.add-pet-page {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.page-header h1 {
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
