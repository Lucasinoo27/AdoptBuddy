<template>
  <div class="filter-wrapper" data-aos="fade-right">
    <div class="filter-header">
      <h3>Filter Pets</h3>
      <button class="clear-button" @click="clearFilters">
        <i class="fas fa-undo-alt"></i>
        Reset
      </button>
    </div>

    <!-- Search Input -->
    <div class="filter-group">
      <div class="input-wrapper">
        <div class="input-icon">
          <i class="fas fa-search"></i>
        </div>
        <input
          type="text"
          id="searchInput"
          v-model="filters.searchQuery"
          class="form-control"
          placeholder="Search by name..."
          @input="emitFilters"
        />
      </div>
    </div>

    <!-- Pet Type Filter -->
    <div class="filter-group">
      <label class="filter-label">Pet Type</label>
      <div class="type-buttons">
        <button
          v-for="type in petTypes"
          :key="type"
          class="type-button"
          :class="{ active: filters.selectedType === type }"
          @click="selectType(type)"
        >
          <i :class="getPetTypeIcon(type)"></i>
          {{ type }}
        </button>
      </div>
    </div>

    <!-- Age Filter -->
    <div class="filter-group">
      <label class="filter-label">
        Maximum Age: <span class="age-value">{{ filters.maxAge }} years</span>
      </label>
      <div class="range-wrapper">
        <input
          type="range"
          id="ageRange"
          v-model="filters.maxAge"
          class="range-input"
          min="0"
          max="30"
          step="1"
          @input="emitFilters"
        />
        <div class="range-labels">
          <span>0</span>
          <span>15</span>
          <span>30</span>
        </div>
      </div>
    </div>

    <!-- Favorites Filter -->
    <div class="filter-group">
      <label class="toggle-wrapper">
        <input
          type="checkbox"
          id="favoritesOnly"
          v-model="filters.showFavoritesOnly"
          @change="emitFilters"
        />
        <span class="toggle-slider"></span>
        <span class="toggle-label">
          <i class="fas fa-heart"></i>
          Show Favorites Only
        </span>
      </label>
    </div>

    <!-- Sort Options -->
    <div class="filter-group">
      <label class="filter-label">Sort By</label>
      <div class="sort-wrapper">
        <div class="input-icon">
          <i class="fas fa-sort"></i>
        </div>
        <select
          id="sortSelect"
          v-model="filters.sortBy"
          class="form-control"
          @change="emitFilters"
        >
          <option value="">Default</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="type">Type</option>
        </select>
      </div>
    </div>
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
      petTypes: ["Dog", "Cat", "Bird", "Rabbit"],
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
    selectType(type) {
      this.filters.selectedType =
        this.filters.selectedType === type ? "" : type;
      this.emitFilters();
    },
    getPetTypeIcon(type) {
      switch (type.toLowerCase()) {
        case "dog":
          return "fas fa-dog";
        case "cat":
          return "fas fa-cat";
        case "bird":
          return "fas fa-dove";
        case "rabbit":
          return "fas fa-paw";
        default:
          return "fas fa-paw";
      }
    },
  },
};
</script>

<style scoped>
.filter-wrapper {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.clear-button {
  background: none;
  border: none;
  color: #6366f1;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: rgba(99, 102, 241, 0.1);
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.75rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  z-index: 1;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  outline: none;
}

/* Type Buttons */
.type-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.type-button {
  background: #f3f4f6;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.type-button:hover {
  background: #e5e7eb;
}

.type-button.active {
  background: #6366f1;
  color: white;
}

/* Range Input */
.range-wrapper {
  padding: 0 0.5rem;
}

.range-input {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 1rem;
  outline: none;
  -webkit-appearance: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #6366f1;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.range-input::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.range-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.age-value {
  color: #6366f1;
  font-weight: 600;
}

/* Toggle Switch */
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.toggle-wrapper input {
  display: none;
}

.toggle-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.toggle-slider:before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  top: 3px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
}

input:checked + .toggle-slider {
  background: #6366f1;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.toggle-label {
  font-size: 0.875rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-label i {
  color: #ec4899;
}

/* Sort Select */
.sort-wrapper {
  position: relative;
}

.sort-wrapper .input-icon {
  left: 1rem;
  color: #6b7280;
}

.sort-wrapper select {
  width: 100%;
  padding-left: 2.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .filter-wrapper {
    padding: 1rem;
  }

  .type-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
