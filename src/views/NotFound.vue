<template>
  <div class="not-found-container">
    <div class="not-found-card" data-aos="fade-up">
      <!-- Decorative elements -->
      <div class="decorative-icons">
        <i
          class="fas fa-paw paw-icon"
          data-aos="fade-down"
          data-aos-delay="200"
        ></i>
        <i
          class="fas fa-bone bone-icon"
          data-aos="fade-down"
          data-aos-delay="400"
        ></i>
        <i
          class="fas fa-fish fish-icon"
          data-aos="fade-down"
          data-aos-delay="600"
        ></i>
      </div>

      <!-- Main content -->
      <div class="content-wrapper">
        <h1 class="gradient-text" data-aos="fade-up" data-aos-delay="200">
          404
        </h1>
        <div class="message-box" data-aos="fade-up" data-aos-delay="400">
          <h2>Oops! Page Not Found</h2>
          <p>Looks like this page has run away to chase some butterflies! 🦋</p>
        </div>

        <!-- Main illustration -->
        <div class="illustration" data-aos="bounce" data-aos-delay="600">
          <i class="fas fa-dog"></i>
        </div>

        <!-- Action buttons -->
        <div class="action-buttons" data-aos="fade-up" data-aos-delay="800">
          <router-link to="/home" class="btn primary-btn">
            <i class="fas fa-home me-2"></i>
            Return Home
          </router-link>
          <router-link to="/add-pet" class="btn secondary-btn">
            <i class="fas fa-plus-circle me-2"></i>
            Add a Pet
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found-container {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.not-found-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 600px;
  width: 100%;
  position: relative;
}

.content-wrapper {
  text-align: center;
}

.gradient-text {
  font-size: 6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

.message-box {
  margin-bottom: 2rem;
}

.message-box h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.message-box p {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 0;
}

.illustration {
  font-size: 6rem;
  color: #6366f1;
  margin: 2rem 0;
  animation: float 3s ease-in-out infinite;
}

.decorative-icons {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
}

.paw-icon,
.bone-icon,
.fish-icon {
  position: absolute;
  color: rgba(99, 102, 241, 0.1);
  animation: float 3s ease-in-out infinite;
}

.paw-icon {
  top: 10%;
  left: 10%;
  font-size: 2rem;
}

.bone-icon {
  top: 20%;
  right: 15%;
  font-size: 1.8rem;
  animation-delay: 0.5s;
}

.fish-icon {
  bottom: 15%;
  left: 20%;
  font-size: 1.5rem;
  animation-delay: 1s;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.primary-btn,
.secondary-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.primary-btn {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  color: white;
}

.secondary-btn {
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border: none;
}

.secondary-btn:hover {
  background: rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
  color: #4f46e5;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .not-found-card {
    padding: 2rem;
  }

  .gradient-text {
    font-size: 4rem;
  }

  .message-box h2 {
    font-size: 1.5rem;
  }

  .illustration {
    font-size: 4rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }
}
</style>
