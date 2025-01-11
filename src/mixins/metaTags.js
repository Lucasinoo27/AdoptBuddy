export default {
  created() {
    // Update meta tags when component is created
    this.updateMetaTags();
  },
  methods: {
    updateMetaTags() {
      // Get meta info from route
      const { meta } = this.$route;
      if (!meta) return;

      // Update title
      if (meta.title) {
        document.title = `${meta.title} - AdoptBuddy`;
      }

      // Update meta description
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement("meta");
        descriptionTag.setAttribute("name", "description");
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.setAttribute(
        "content",
        meta.description ||
          "Find your perfect pet companion with AdoptBuddy. Browse, adopt, and give a loving home to pets in need."
      );

      // Update keywords
      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement("meta");
        keywordsTag.setAttribute("name", "keywords");
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute(
        "content",
        meta.keywords ||
          "pet adoption, adopt pets, dogs, cats, birds, pet rescue"
      );

      // Update Open Graph tags
      this.updateOpenGraphTag(
        "og:title",
        meta.title
          ? `${meta.title} - AdoptBuddy`
          : "AdoptBuddy - Pet Adoption Platform"
      );
      this.updateOpenGraphTag(
        "og:description",
        meta.description || "Find your perfect pet companion with AdoptBuddy"
      );
      this.updateOpenGraphTag("og:image", meta.image || "/favicon.png");
      this.updateOpenGraphTag("og:url", window.location.href);
    },
    updateOpenGraphTag(property, content) {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    },
  },
  watch: {
    // Update meta tags when route changes
    $route() {
      this.updateMetaTags();
    },
  },
};
