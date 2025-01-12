<template>
  <div class="no-results">
    <div class="no-results-content">
      <i class="fas fa-search fa-3x mb-3"></i>
      <h3>{{ title }}</h3>
      <p class="text-muted">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoResults",
  props: {
    title: {
      type: String,
      default: "No pets found",
    },
    message: {
      type: String,
      default: "Try adjusting your filters to find more pets",
    },
  },
};
</script>

<style scoped>
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 0;
}

.no-results-content {
  color: #6b7280;
}

.no-results-content i {
  color: #d1d5db;
}

.no-results-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.no-results-content p {
  font-size: 0.875rem;
  max-width: 300px;
  margin: 0 auto;
}
</style>
