<template>
  <router-link
    class="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
    to="/"
  >
    <img
      src="/favicon.png"
      alt="AdoptBuddy Logo"
      class="logo-img"
      width="38"
      height="38"
    />
    <span class="brand-text fw-bold fs-4">AdoptBuddy</span>
  </router-link>
</template>

<script>
export default {
  name: "NavBrand",
};
</script>

<style scoped>
.logo-img {
  transition: transform 0.3s ease;
}

.navbar-brand:hover .logo-img {
  transform: scale(1.05);
}

.brand-text {
  color: #6366f1;
}
</style>
