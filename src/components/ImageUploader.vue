<!-- eslint-disable prettier/prettier -->
<template>
  <div class="image-uploader">
    <!-- Preview Area -->
    <div
      class="preview-area mb-3"
      :class="{ 'has-image': previewUrl }"
      @click="triggerFileInput"
    >
      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Preview"
        class="preview-image"
      />
      <div v-else class="upload-placeholder">
        <i class="fas fa-cloud-upload-alt fa-2x mb-2"></i>
        <p class="mb-0">Click to upload image</p>
        <small class="text-muted">or drag and drop</small>
      </div>
    </div>

    <!-- File Input -->
    <input
      type="file"
      ref="fileInput"
      class="d-none"
      accept="image/*"
      @change="handleFileSelect"
    />

    <!-- Error Message -->
    <div v-if="error" class="alert alert-danger mt-2" role="alert">
      {{ error }}
    </div>

    <!-- Remove Button -->
    <button
      v-if="previewUrl"
      class="btn btn-outline-danger btn-sm mt-2"
      @click.prevent="removeImage"
    >
      Remove Image
    </button>
  </div>
</template>

<script>
export default {
  name: "ImageUploader",
  props: {
    maxSize: {
      type: Number,
      default: 5, // Maximum file size in MB
    },
    initialImage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      previewUrl: this.initialImage,
      error: "",
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        this.error = "Please select an image file";
        return;
      }

      // Validate file size
      if (file.size > this.maxSize * 1024 * 1024) {
        this.error = `File size should not exceed ${this.maxSize}MB`;
        return;
      }

      this.error = ""; // Clear any previous errors

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target.result;
        this.$emit("image-selected", {
          file,
          dataUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.previewUrl = "";
      this.$refs.fileInput.value = "";
      this.$emit("image-removed");
    },
  },
  watch: {
    initialImage: {
      handler(newValue) {
        if (newValue !== this.previewUrl) {
          this.previewUrl = newValue;
        }
      },
    },
  },
};
</script>

<style scoped>
.image-uploader {
  width: 100%;
}

.preview-area {
  width: 100%;
  height: 200px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-area:hover {
  border-color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.05);
}

.preview-area.has-image {
  border-style: solid;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  text-align: center;
  color: #6c757d;
}

.upload-placeholder i {
  color: #0d6efd;
}
</style>
