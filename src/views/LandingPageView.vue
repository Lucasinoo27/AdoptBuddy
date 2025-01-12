<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <h1 class="hero-title">
              Find Your Perfect
              <span class="highlight">Companion</span>
            </h1>
            <p class="hero-subtitle">
              Connect with loving pets waiting for their forever home. Start
              your journey of companionship today.
            </p>
            <div class="hero-buttons">
              <router-link
                :to="{ name: 'Home' }"
                class="btn btn-primary btn-lg me-3"
              >
                <i class="fas fa-search me-2"></i>
                Browse Pets
              </router-link>
              <router-link
                :to="{ name: 'About' }"
                class="btn btn-outline-primary btn-lg"
              >
                Learn More
              </router-link>
            </div>
          </div>
          <div class="col-lg-6 position-relative" data-aos="fade-left">
            <img
              src="@/assets/home-background.png"
              alt="Happy pets"
              class="hero-image"
            />
            <div class="floating-card" data-aos="fade-up" data-aos-delay="200">
              <div class="card-icon">
                <i class="fas fa-heart"></i>
              </div>
              <div class="card-content">
                <h3>1000+ Adoptions</h3>
                <p>Happy pets found their forever homes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3>Easy Search</h3>
              <p>Find your perfect pet match with our smart filters</p>
            </div>
          </div>
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Safe Process</h3>
              <p>Verified pets and secure adoption procedures</p>
            </div>
          </div>
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>Support</h3>
              <p>Guidance throughout your adoption journey</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Stories Section -->
    <section class="stories-section">
      <div class="container">
        <h2 class="section-title text-center mb-5" data-aos="fade-up">
          Success Stories
        </h2>
        <div class="row">
          <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div class="story-card">
              <div class="story-image">
                <img src="@/assets/dog.jpg" alt="Happy dog" />
              </div>
              <div class="story-content">
                <h3>Max & Sarah</h3>
                <p class="story-quote">
                  "Finding Max on AdoptBuddy was the best thing that happened to
                  us!"
                </p>
                <div class="story-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div class="story-card">
              <div class="story-image">
                <img src="@/assets/dog.jpg" alt="Happy cat" />
              </div>
              <div class="story-content">
                <h3>Luna & Mike</h3>
                <p class="story-quote">
                  "The adoption process was smooth and professional!"
                </p>
                <div class="story-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
            <div class="story-card">
              <div class="story-image">
                <img src="@/assets/dog.jpg" alt="Happy rabbit" />
              </div>
              <div class="story-content">
                <h3>Bella & Emma</h3>
                <p class="story-quote">
                  "AdoptBuddy made finding our perfect pet so easy!"
                </p>
                <div class="story-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section text-center">
      <div class="container">
        <div class="cta-content" data-aos="zoom-in">
          <h2 class="mb-4">Ready to Meet Your New Best Friend?</h2>
          <p class="mb-4">
            Start browsing our available pets and find your perfect companion
            today.
          </p>
          <router-link :to="{ name: 'Home' }" class="btn btn-primary btn-lg">
            <i class="fas fa-heart me-2"></i>
            Start Adopting
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.highlight {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.floating-card {
  position: absolute;
  bottom: -2rem;
  right: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.card-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon i {
  font-size: 1.5rem;
  color: white;
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.card-content p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background: white;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.feature-icon i {
  font-size: 1.5rem;
  color: white;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6b7280;
  margin: 0;
}

/* Stories Section */
.stories-section {
  padding: 6rem 0;
  background: #f8f9fa;
}

.story-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
}

.story-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-content {
  padding: 1.5rem;
}

.story-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.story-quote {
  color: #6b7280;
  font-style: italic;
  margin-bottom: 1rem;
}

.story-rating {
  color: #fbbf24;
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.btn-primary {
  background: white;
  color: #6366f1;
  border: none;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background: white;
  color: #4f46e5;
}

.btn-outline-primary {
  background: transparent;
  color: #6366f1;
  border: 2px solid #6366f1;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Section Titles */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 3rem;
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .hero-title {
    font-size: 3rem;
  }

  .floating-card {
    position: static;
    margin-top: 2rem;
  }
}

@media (max-width: 767.98px) {
  .hero-section {
    padding: 4rem 0;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-image {
    margin-top: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .feature-card,
  .story-card {
    margin-bottom: 1.5rem;
  }
}
</style>
