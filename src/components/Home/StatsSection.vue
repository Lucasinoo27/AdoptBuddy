<template>
  <div class="stats-section" data-aos="fade-up">
    <div class="stats-grid">
      <!-- Total Pets -->
      <div class="stats-card" data-aos="fade-up" data-aos-delay="100">
        <div class="stats-icon">
          <i class="fas fa-paw"></i>
        </div>
        <div class="stats-content">
          <div class="stats-value">{{ totalPets }}</div>
          <div class="stats-label">Total Pets</div>
        </div>
      </div>

      <!-- Pet Types -->
      <div class="stats-card types" data-aos="fade-up" data-aos-delay="200">
        <div class="type-stats">
          <div
            v-for="(count, type) in petsByType"
            :key="type"
            class="type-stat"
            :class="{ 'has-pets': count > 0 }"
          >
            <div class="type-header">
              <i :class="getPetTypeIcon(type)"></i>
              <span class="type-name">{{ type }}s</span>
              <span class="type-count">{{ count }}</span>
            </div>
            <div class="type-bar-wrapper">
              <div
                class="type-bar"
                :style="{
                  width: `${(count / totalPets) * 100}%`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Favorites -->
      <div class="stats-card" data-aos="fade-up" data-aos-delay="300">
        <div class="stats-icon favorite-icon">
          <i class="fas fa-heart"></i>
        </div>
        <div class="stats-content">
          <div class="stats-value">{{ favoritesCount }}</div>
          <div class="stats-label">
            Favorites
            <span class="percentage" v-if="totalPets > 0">
              ({{ Math.round((favoritesCount / totalPets) * 100) }}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePetStats } from "@/composables/usePetStats";

export default {
  name: "StatsSection",
  setup() {
    const { totalPets, favoritesCount, petsByType, getPetTypeIcon } =
      usePetStats();

    return {
      totalPets,
      favoritesCount,
      petsByType,
      getPetTypeIcon,
    };
  },
};
</script>

<style scoped>
.stats-section {
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: stretch;
}

.stats-card {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  flex-shrink: 0;
}

.stats-icon i {
  font-size: 1.25rem;
  color: white;
}

.stats-icon.favorite-icon {
  background: var(--gradient-secondary);
}

.stats-content {
  min-width: 80px;
}

.stats-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stats-label {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
}

.percentage {
  color: #6366f1;
  font-size: 0.75rem;
}

/* Pet Types Card */
.stats-card.types {
  padding: 1rem 1.5rem;
}

.type-stats {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.type-stat {
  min-width: 150px;
}

.type-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.type-header i {
  font-size: 1rem;
  color: #6366f1;
}

.type-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  flex: 1;
}

.type-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  min-width: 2rem;
  text-align: center;
}

.type-bar-wrapper {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.type-bar {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive Adjustments */
@media (max-width: 1199.98px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .type-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 991.98px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .stats-card.types {
    grid-column: span 2;
  }
}

@media (max-width: 767.98px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stats-card {
    padding: 0.875rem;
  }

  .stats-card.types {
    grid-column: auto;
  }

  .type-stats {
    grid-template-columns: 1fr;
  }

  .type-stat {
    min-width: 0;
  }
}
</style>
