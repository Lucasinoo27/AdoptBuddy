<template>
  <section class="bg-white py-5 py-lg-6">
    <div class="container">
      <h2 class="display-5 fw-bold text-center mb-5" data-aos="fade-up">
        Why Adopt {{ petName }}?
      </h2>
      <div class="row g-4">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="col-md-4"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)"
        >
          <div class="benefit-card">
            <div class="benefit-icon">
              <i :class="benefit.icon"></i>
            </div>
            <h3 class="fs-4 fw-semibold text-dark mb-3">{{ benefit.title }}</h3>
            <p class="text-secondary mb-0">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PetDetailBenefits",
  props: {
    petName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      benefits: [
        {
          icon: "fas fa-heart",
          title: "Give a Home",
          description: "Provide a loving forever home to a pet in need",
        },
        {
          icon: "fas fa-hands-helping",
          title: "Support",
          description:
            "Get guidance and support throughout the adoption process",
        },
        {
          icon: "fas fa-shield-alt",
          title: "Health Checked",
          description: "All our pets are health-checked and behavior-assessed",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Benefit Card - Custom hover effect */
.benefit-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

/* Benefit Icon - Custom gradient and size */
.benefit-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.benefit-icon i {
  font-size: 1.5rem;
  color: white;
}
</style>
