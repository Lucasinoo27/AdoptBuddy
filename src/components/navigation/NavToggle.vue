<template>
  <button
    class="navbar-toggler border-0 p-2"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarContent"
    aria-controls="navbarContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <i class="fas fa-bars text-primary"></i>
  </button>
</template>

<script>
export default {
  name: "NavToggle",
};
</script>

<style scoped>
.navbar-toggler {
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.navbar-toggler:hover {
  background-color: rgba(99, 102, 241, 0.15);
  transform: translateY(-1px);
}

.text-primary {
  color: #6366f1 !important;
}
</style>
