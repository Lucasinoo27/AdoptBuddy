<template>
  <section class="cta-section text-center py-5 py-lg-6">
    <div class="container">
      <div class="mx-auto" style="max-width: 600px" data-aos="zoom-in">
        <h2 class="display-5 fw-bold text-white mb-4">
          Ready to Welcome {{ petName }} Home?
        </h2>
        <p class="lead text-white mb-4">
          Start your adoption journey today and give {{ petName }} the loving
          home they deserve.
        </p>
        <button class="btn-adopt btn-lg" @click="$emit('adopt-click')">
          <i class="fas fa-paw me-2"></i>
          Start Adoption Process
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PetDetailCTA",
  props: {
    petName: {
      type: String,
      required: true,
    },
  },
  emits: ["adopt-click"],
};
</script>

<style scoped>
/* CTA Section - Custom gradient */
.cta-section {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

/* Adopt Button - Custom hover effect */
.btn-adopt {
  background: white;
  color: #6366f1;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.btn-adopt:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: #4f46e5;
}
</style>
