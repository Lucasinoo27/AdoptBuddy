<template>
  <section class="hero-section" data-aos="fade-up">
    <div class="container">
      <h1 class="display-4 fw-bold text-center mb-4">
        Find Your Perfect
        <span class="highlight">Companion</span>
      </h1>
      <p class="lead text-center text-muted mb-0">
        Discover pets waiting for their forever homes
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomeHero",
};
</script>

<style scoped>
.hero-section {
  padding: 4rem 0;
  background: var(--gradient-light);
  margin-bottom: 2rem;
}

.highlight {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: #3aab97;
}

@media (max-width: 991.98px) {
  .hero-section {
    padding: 3rem 0;
  }
}

@media (max-width: 767.98px) {
  .hero-section {
    padding: 2rem 0;
  }
}
</style>
