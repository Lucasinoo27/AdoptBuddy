<template>
  <div class="quick-actions-wrapper" data-aos="fade-left">
    <div class="quick-actions-card">
      <h3 class="section-title">Quick Actions</h3>

      <!-- Add Pet Button -->
      <router-link
        to="/add-pet"
        class="action-button primary"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        <div class="button-icon">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="button-content">
          <span class="button-title">Add New Pet</span>
          <span class="button-description">List a pet for adoption</span>
        </div>
      </router-link>

      <!-- View Favorites Button -->
      <button
        class="action-button secondary"
        @click="$emit('show-favorites')"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <div class="button-icon">
          <i class="fas fa-heart"></i>
        </div>
        <div class="button-content">
          <span class="button-title">View Favorites</span>
          <span class="button-description">See your saved pets</span>
        </div>
      </button>

      <!-- Help Card -->
      <div class="help-card" data-aos="fade-up" data-aos-delay="300">
        <div class="help-icon">
          <i class="fas fa-question-circle"></i>
        </div>
        <h4>Need Help?</h4>
        <p>Learn more about our adoption process and requirements</p>
        <router-link to="/about" class="help-button">
          Learn More
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuickActions",
  emits: ["show-favorites"],
};
</script>

<style scoped>
.quick-actions-wrapper {
  position: relative;
}

.quick-actions-card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

/* Action Buttons */
.action-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 1rem;
  background: #f9fafb;
  color: inherit;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.action-button:hover {
  transform: translateX(4px);
}

.action-button.primary {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
}

.action-button.primary:hover {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(139, 92, 246, 0.15) 100%
  );
}

.action-button.secondary {
  background: linear-gradient(
    135deg,
    rgba(236, 72, 153, 0.1) 0%,
    rgba(244, 63, 94, 0.1) 100%
  );
}

.action-button.secondary:hover {
  background: linear-gradient(
    135deg,
    rgba(236, 72, 153, 0.15) 0%,
    rgba(244, 63, 94, 0.15) 100%
  );
}

.button-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.primary .button-icon {
  background: var(--gradient-primary);
}

.secondary .button-icon {
  background: var(--gradient-secondary);
}

.button-icon i {
  font-size: 1.25rem;
  color: white;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.button-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.button-description {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Help Card */
.help-card {
  background: var(--gradient-primary);
  border-radius: 1rem;
  padding: 1.5rem;
  color: white;
  text-align: center;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
}

.help-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.help-icon i {
  font-size: 1.5rem;
  color: white;
}

.help-card h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.help-card p {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.help-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.help-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.help-button i {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.help-button:hover i {
  transform: translateX(4px);
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .quick-actions-card {
    padding: 1.25rem;
  }

  .action-button {
    padding: 0.875rem;
  }

  .button-icon {
    width: 38px;
    height: 38px;
  }

  .help-card {
    padding: 1.25rem;
  }
}
</style>
