/**
 * Pet Image Management Composable
 *
 * Handles pet image display and fallback logic.
 * Key features:
 * - Manages image source with fallback support
 * - Handles image loading errors
 * - Provides image update functionality
 */

import { ref } from "vue";

// Creates image management functionality with fallback support when images fail to load
export function usePetImage(initialImage, defaultImage) {
  // Tracks the current image source, falling back to default if initial is not provided
  const mainImage = ref(initialImage || defaultImage);

  // Handles image loading failures by switching to the default image
  const handleImageError = () => {
    mainImage.value = defaultImage;
  };

  // Updates the displayed image, using default image if new image is not provided
  const updateImage = (newImage) => {
    mainImage.value = newImage || defaultImage;
  };

  return {
    mainImage,
    handleImageError,
    updateImage,
  };
}
