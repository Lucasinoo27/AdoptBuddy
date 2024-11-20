<template>
  <div class="container text-center mt-5">
    <h1 class="display-1 text-danger">404</h1>
    <p class="fs-4 text-muted">
      Oops! The page you're looking for doesn't exist.
    </p>
    <router-link to="/" class="btn btn-primary mt-3">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.container {
  margin-top: 50px;
}
</style>
