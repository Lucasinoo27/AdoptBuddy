import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: () => import("@/views/LandingPageView.vue"),
    meta: {
      title: "Welcome",
      description:
        "Welcome to AdoptBuddy - Find your perfect pet companion and give a loving home to pets in need.",
      keywords: "pet adoption, adopt pets, find pets, rescue animals",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      title: "Browse Pets",
      description:
        "Browse our selection of adorable pets waiting for their forever homes. Filter by type, age, and more.",
      keywords: "browse pets, adopt pets, pet listings, dogs, cats, birds",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutPage.vue"),
    meta: {
      title: "About Us",
      description:
        "Learn about AdoptBuddy's mission to connect loving homes with pets in need of adoption.",
      keywords: "about adoptbuddy, pet adoption mission, our story",
    },
  },
  {
    path: "/add-pet",
    name: "AddPetPage",
    component: () => import("@/views/AddPetPage.vue"),
    meta: {
      title: "Add a Pet",
      description:
        "List a pet for adoption. Help find them their perfect forever home.",
      keywords: "list pet, add pet, pet adoption listing",
    },
  },
  {
    path: "/pet/:id",
    name: "PetDetail",
    component: () => import("@/views/PetDetail.vue"),
    props: true,
    meta: {
      title: "Pet Details",
      description:
        "View detailed information about this pet and learn how you can give them a loving home.",
      keywords: "pet details, pet profile, adopt pet",
    },
  },
  {
    path: "/edit/:id",
    name: "EditPet",
    component: () => import("@/views/EditPetPage.vue"),
    props: true,
    meta: {
      title: "Edit Pet",
      description:
        "Update pet information and help them find their perfect match.",
      keywords: "edit pet, update pet, pet information",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "Page Not Found",
      description:
        "The page you're looking for doesn't exist. Return home to continue browsing pets.",
      keywords: "404, not found, error",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
