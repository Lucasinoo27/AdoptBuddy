<template>
  <div class="p-4">
    <h1 class="display-4 fw-bold text-dark mb-4">{{ petName }}</h1>

    <div class="info-cards mb-4">
      <div
        class="info-card bg-white rounded-3 p-4 d-flex align-items-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div class="info-icon">
          <i :class="petTypeIcon"></i>
        </div>
        <div class="ms-3">
          <h3
            class="text-uppercase fw-semibold text-secondary mb-0"
            style="font-size: 0.875rem"
          >
            Type
          </h3>
          <p class="fs-5 fw-semibold text-dark mb-0">{{ petType }}</p>
        </div>
      </div>

      <div
        class="info-card bg-white rounded-3 p-4 d-flex align-items-center mt-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div class="info-icon">
          <i class="fas fa-birthday-cake"></i>
        </div>
        <div class="ms-3">
          <h3
            class="text-uppercase fw-semibold text-secondary mb-0"
            style="font-size: 0.875rem"
          >
            Age
          </h3>
          <p class="fs-5 fw-semibold text-dark mb-0">{{ ageText }}</p>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-3 p-4 mb-4 shadow-sm"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <h3 class="fs-4 fw-semibold text-dark mb-3">About {{ petName }}</h3>
      <p class="text-secondary mb-0 lh-base">{{ description }}</p>
    </div>

    <button
      class="btn-adopt"
      @click="$emit('adopt-click')"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <i class="fas fa-paw me-2"></i>
      Adopt {{ petName }}
    </button>
  </div>
</template>

<script>
export default {
  name: "PetDetailInfo",
  props: {
    petName: {
      type: String,
      required: true,
    },
    petType: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  emits: ["adopt-click"],
  computed: {
    ageText() {
      return `${this.age} ${this.age === 1 ? "year" : "years"} old`;
    },
    petTypeIcon() {
      switch (this.petType.toLowerCase()) {
        case "dog":
          return "fas fa-dog";
        case "cat":
          return "fas fa-cat";
        case "bird":
          return "fas fa-dove";
        default:
          return "fas fa-paw";
      }
    },
  },
};
</script>

<style scoped>
/* Info Cards - Custom grid and hover effect */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-card {
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

/* Info Icon - Custom gradient and size */
.info-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon i {
  font-size: 1.25rem;
  color: white;
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

@media (max-width: 767.98px) {
  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>
