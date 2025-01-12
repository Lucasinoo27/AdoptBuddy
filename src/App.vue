<template>
  <ErrorBoundary>
    <div id="app">
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid px-4">
          <!-- Brand -->
          <router-link class="navbar-brand" to="/home" data-aos="fade-right">
            <img src="/favicon.png" alt="AdoptBuddy Logo" class="logo me-2" />
            <span class="brand-name">AdoptBuddy</span>
          </router-link>

          <!-- Mobile Toggle -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <!-- Nav Content -->
          <div
            class="collapse navbar-collapse justify-content-center"
            id="navbarContent"
          >
            <ul class="navbar-nav text-center">
              <li class="nav-item" data-aos="fade-down" data-aos-delay="100">
                <router-link
                  class="nav-link"
                  to="/home"
                  :class="{ active: $route.name === 'Home' }"
                >
                  <i class="fas fa-home me-2"></i>
                  Home
                </router-link>
              </li>
              <li class="nav-item" data-aos="fade-down" data-aos-delay="200">
                <router-link
                  class="nav-link"
                  to="/add-pet"
                  :class="{ active: $route.name === 'AddPet' }"
                >
                  <i class="fas fa-plus-circle me-2"></i>
                  Add Pet
                </router-link>
              </li>
              <li class="nav-item" data-aos="fade-down" data-aos-delay="300">
                <router-link
                  class="nav-link"
                  to="/about"
                  :class="{ active: $route.name === 'About' }"
                >
                  <i class="fas fa-info-circle me-2"></i>
                  About
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div v-if="isLoading" class="loader-wrapper">
        <div class="spinner">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading...</p>
        </div>
      </div>

      <ErrorBoundary>
        <router-view />
      </ErrorBoundary>
    </div>
  </ErrorBoundary>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

export default {
  name: "App",
  components: {
    ErrorBoundary,
  },
  setup() {
    const isLoading = ref(false);
    const router = useRouter();

    router.beforeEach((to, from, next) => {
      isLoading.value = true;
      next();
    });

    router.afterEach(() => {
      isLoading.value = false;
    });

    const handleError = (error) => {
      console.error("Global error caught:", error);
    };

    return {
      isLoading,
      handleError,
    };
  },
};
</script>

<style>
/* Reset and base styles */
html,
body {
  margin: 0;
  padding: 0;
  overflow-y: visible;
}

/* Main app container */
#app {
  min-height: 100vh;
  padding-top: 72px;
}

/* Navbar styles */
.navbar {
  height: 72px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
}

.logo {
  height: 38px;
  width: auto;
  transition: transform 0.3s ease;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  min-width: 180px;
}

.navbar-brand:hover .logo {
  transform: scale(1.05);
}

.brand-name {
  font-size: 1.35rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Navigation Links */
.navbar-nav {
  gap: 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin: 0 0.125rem;
  color: #4b5563;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  text-align: center;
}

.nav-link:hover {
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.08);
}

.nav-link.active {
  color: #4f46e5;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 6px;
  left: 1.25rem;
  right: 1.25rem;
  height: 2px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

/* Action Buttons */
.nav-action-button {
  width: 42px;
  height: 42px;
  margin-left: 0.75rem;
  border: none;
  border-radius: 12px;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-action-button:hover {
  background: #4f46e5;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

/* Mobile Toggle */
.navbar-toggler {
  width: 42px;
  height: 42px;
  padding: 0;
  border: none;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-toggler:focus {
  box-shadow: none;
  background: rgba(99, 102, 241, 0.15);
}

.navbar-toggler:hover {
  background: rgba(99, 102, 241, 0.15);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

/* Loading overlay */
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 2000;
}

.spinner {
  text-align: center;
}

.spinner p {
  color: #6366f1;
  font-weight: 500;
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .navbar {
    height: auto;
    padding: 0.75rem 1rem;
  }

  .navbar-collapse {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    margin: 1rem -1rem -0.75rem;
    padding: 1rem;
    border-top: 1px solid rgba(99, 102, 241, 0.1);
    border-radius: 0 0 16px 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .nav-link {
    padding: 0.875rem 1.25rem;
    margin: 0.25rem 0;
    border-radius: 10px;
  }

  .nav-link:hover {
    background: rgba(99, 102, 241, 0.08);
    transform: translateX(4px);
  }

  .nav-link.active {
    background: rgba(99, 102, 241, 0.12);
  }

  .nav-link::after {
    display: none;
  }

  .navbar-nav {
    margin: 0.75rem 0;
    width: 100%;
  }

  .nav-action-button {
    margin: 0.375rem 0;
    width: 100%;
    height: 46px;
    border-radius: 10px;
    font-size: 1rem;
  }

  .nav-action-button:hover {
    transform: translateX(4px);
  }
}
</style>
