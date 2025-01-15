<template>
  <ul class="navbar-nav justify-content-center w-100">
    <li class="nav-item px-2">
      <router-link
        class="nav-link d-flex align-items-center"
        :class="{ 'active fw-semibold': $route.name === 'Home' }"
        to="/home"
      >
        <i class="fas fa-home me-2"></i>
        Home
      </router-link>
    </li>
    <li class="nav-item px-2">
      <router-link
        class="nav-link d-flex align-items-center"
        :class="{ 'active fw-semibold': $route.name === 'AddPet' }"
        to="/add-pet"
      >
        <i class="fas fa-plus-circle me-2"></i>
        Add Pet
      </router-link>
    </li>
    <li class="nav-item px-2">
      <router-link
        class="nav-link d-flex align-items-center"
        :class="{ 'active fw-semibold': $route.name === 'About' }"
        to="/about"
      >
        <i class="fas fa-info-circle me-2"></i>
        About
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "NavLinks",
};
</script>

<style scoped>
.nav-link {
  color: #4b5563;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.nav-link:hover {
  color: #6366f1;
  background-color: rgba(99, 102, 241, 0.08);
}

.nav-link.active {
  color: #6366f1;
  background-color: rgba(99, 102, 241, 0.12);
}
</style>
