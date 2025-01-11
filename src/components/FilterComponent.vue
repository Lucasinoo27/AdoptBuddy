<!-- eslint-disable prettier/prettier -->
<template>
  <div class="filter-container border p-3 rounded bg-light">
    <!-- Search Input -->
    <div class="mb-3">
      <label for="searchInput" class="form-label">Search Pets</label>
      <input
        type="text"
        id="searchInput"
        v-model="filters.searchQuery"
        class="form-control"
        placeholder="Search by name..."
        @input="emitFilters"
      />
    </div>

    <!-- Pet Type Filter -->
    <div class="mb-3">
      <label for="typeSelect" class="form-label">Pet Type</label>
      <select
        id="typeSelect"
        v-model="filters.selectedType"
        class="form-select"
        @change="emitFilters"
      >
        <option value="">All Types</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Bird">Bird</option>
      </select>
    </div>

    <!-- Age Filter -->
    <div class="mb-3">
      <label for="ageRange" class="form-label">
        Maximum Age: {{ filters.maxAge }} years
      </label>
      <input
        type="range"
        id="ageRange"
        v-model="filters.maxAge"
        class="form-range"
        min="0"
        max="30"
        step="1"
        @input="emitFilters"
      />
    </div>

    <!-- Favorites Filter -->
    <div class="form-check mb-3">
      <input
        type="checkbox"
        id="favoritesOnly"
        v-model="filters.showFavoritesOnly"
        class="form-check-input"
        @change="emitFilters"
      />
      <label class="form-check-label" for="favoritesOnly">
        Show Favorites Only
      </label>
    </div>

    <!-- Sort Options -->
    <div class="mb-3">
      <label for="sortSelect" class="form-label">Sort By</label>
      <select
        id="sortSelect"
        v-model="filters.sortBy"
        class="form-select"
        @change="emitFilters"
      >
        <option value="">Default</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
        <option value="type">Type</option>
      </select>
    </div>

    <!-- Clear Filters Button -->
    <button class="btn btn-secondary w-100" @click="clearFilters">
      Clear Filters
    </button>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  data() {
    return {
      filters: {
        searchQuery: "",
        selectedType: "",
        maxAge: 30,
        showFavoritesOnly: false,
        sortBy: "",
      },
    };
  },
  methods: {
    emitFilters() {
      this.$emit("filter-change", { ...this.filters });
    },
    clearFilters() {
      this.filters = {
        searchQuery: "",
        selectedType: "",
        maxAge: 30,
        showFavoritesOnly: false,
        sortBy: "",
      };
      this.emitFilters();
    },
  },
};
</script>

<style scoped>
.filter-container {
  max-width: 300px;
  margin: 1rem 0;
}

.form-label {
  font-weight: 500;
  color: #495057;
}

.form-range::-webkit-slider-thumb {
  background: #0d6efd;
}

.form-range::-moz-range-thumb {
  background: #0d6efd;
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
