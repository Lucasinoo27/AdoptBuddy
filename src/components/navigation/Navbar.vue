<template>
  <nav class="navbar navbar-expand-lg fixed-top bg-white shadow-sm">
    <div class="container-fluid px-4">
      <NavBrand />
      <NavToggle />
      <div
        class="collapse navbar-collapse mt-2 mt-lg-0 pt-2 pt-lg-0 border-top border-top-lg-0"
        id="navbarContent"
      >
        <NavLinks />
      </div>
    </div>
  </nav>
</template>

<script>
import NavBrand from "./NavBrand.vue";
import NavToggle from "./NavToggle.vue";
import NavLinks from "./NavLinks.vue";

export default {
  name: "MainNavbar",
  components: {
    NavBrand,
    NavToggle,
    NavLinks,
  },
};
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95) !important;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    background-color: rgba(255, 255, 255, 0.98);
    margin: 0 -1.5rem;
    padding: 1rem 1.5rem;
    border-radius: 0 0 1rem 1rem;
  }
}

@media (min-width: 992px) {
  .border-top-lg-0 {
    border-top: 0 !important;
  }
}
</style>
