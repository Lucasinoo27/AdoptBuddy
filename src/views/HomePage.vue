<template>
  <div class="home-page">
    <HomeHero />
    <div class="main-content">
      <div class="container-fluid">
        <div class="row g-4">
          <!-- Filter Sidebar -->
          <div class="col-lg-3 col-xl-2">
            <div class="sticky-sidebar">
              <FilterComponent @filter-change="handleFilterChange" />
            </div>
          </div>

          <!-- Pet Cards Grid -->
          <div class="col-lg-6 col-xl-8">
            <StatsSection />

            <!-- Pet Grid -->
            <div class="pet-grid" data-aos="fade-up">
              <template v-if="filteredAndSortedPets.length">
                <div
                  v-for="pet in paginatedPets"
                  :key="pet.id"
                  class="pet-card-wrapper"
                  data-aos="fade-up"
                >
                  <PetCard :pet="pet" />
                </div>
              </template>
              <NoResults v-else />
            </div>

            <!-- Pagination -->
            <div class="pagination-wrapper" data-aos="fade-up">
              <PaginationComponent
                :total-items="filteredAndSortedPets.length"
                :current-page="currentPage"
                :items-per-page="itemsPerPage"
                @page-change="handlePageChange"
                @update:items-per-page="handleItemsPerPageChange"
              />
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="col-lg-3 col-xl-2 d-none d-lg-block">
            <div class="sticky-sidebar">
              <QuickActions @show-favorites="showFavorites" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePetFiltering } from "@/composables/usePetFiltering";
import HomeHero from "@/components/Home/HomeHero.vue";
import StatsSection from "@/components/Home/StatsSection.vue";
import QuickActions from "@/components/Home/QuickActions.vue";
import NoResults from "@/components/Home/NoResults.vue";
import PetCard from "@/components/PetCard.vue";
import FilterComponent from "@/components/FilterComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
  name: "HomePage",
  components: {
    HomeHero,
    StatsSection,
    QuickActions,
    NoResults,
    PetCard,
    FilterComponent,
    PaginationComponent,
  },
  setup() {
    const {
      filters,
      currentPage,
      itemsPerPage,
      filteredAndSortedPets,
      paginatedPets,
      handleFilterChange,
      handlePageChange,
      handleItemsPerPageChange,
      showFavorites,
    } = usePetFiltering();

    return {
      filters,
      currentPage,
      itemsPerPage,
      filteredAndSortedPets,
      paginatedPets,
      handleFilterChange,
      handlePageChange,
      handleItemsPerPageChange,
      showFavorites,
    };
  },
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.main-content {
  padding-bottom: 4rem;
}

.container-fluid {
  max-width: 1920px;
  padding: 0 2rem;
}

/* Sticky Sidebars */
.sticky-sidebar {
  position: sticky;
  top: 2rem;
}

/* Pet Grid */
.pet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.pet-card-wrapper {
  height: 100%;
}

/* Pagination */
.pagination-wrapper {
  margin-top: 2rem;
}

/* Responsive Adjustments */
@media (max-width: 1199.98px) {
  .container-fluid {
    padding: 0 1rem;
  }

  .pet-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 991.98px) {
  .sticky-sidebar {
    position: static;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 767.98px) {
  .container-fluid {
    padding: 0 1rem;
  }
}
</style>
