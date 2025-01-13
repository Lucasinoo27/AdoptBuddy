<template>
  <nav aria-label="Page navigation" v-if="totalPages > 1">
    <ul class="pagination justify-content-center">
      <!-- Previous Button -->
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <button
          class="page-link"
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="visually-hidden">Previous</span>
        </button>
      </li>

      <!-- First Page -->
      <li
        v-if="showFirst"
        :class="['page-item', { active: currentPage === 1 }]"
      >
        <button class="page-link" @click="changePage(1)">1</button>
      </li>

      <!-- Left Ellipsis -->
      <li v-if="showLeftEllipsis" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Page Numbers -->
      <li
        v-for="page in visiblePages"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <button class="page-link" @click="changePage(page)">
          {{ page }}
        </button>
      </li>

      <!-- Right Ellipsis -->
      <li v-if="showRightEllipsis" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Last Page -->
      <li
        v-if="showLast"
        :class="['page-item', { active: currentPage === totalPages }]"
      >
        <button class="page-link" @click="changePage(totalPages)">
          {{ totalPages }}
        </button>
      </li>

      <!-- Next Button -->
      <li :class="['page-item', { disabled: currentPage === totalPages }]">
        <button
          class="page-link"
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="visually-hidden">Next</span>
        </button>
      </li>
    </ul>

    <!-- Items per page selector -->
    <div class="d-flex justify-content-center align-items-center mt-2">
      <label for="itemsPerPage" class="me-2">Items per page:</label>
      <select
        id="itemsPerPage"
        v-model="localItemsPerPage"
        class="form-select form-select-sm"
        style="width: auto"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
  </nav>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      pageSizes: [12, 24, 48, 96],
      localItemsPerPage: this.itemsPerPage,
      maxVisiblePages: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.localItemsPerPage);
    },
    visiblePages() {
      let start = Math.max(
        1,
        this.currentPage - Math.floor(this.maxVisiblePages / 2)
      );
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

      if (end - start + 1 < this.maxVisiblePages) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    showFirst() {
      return !this.visiblePages.includes(1);
    },
    showLast() {
      return !this.visiblePages.includes(this.totalPages);
    },
    showLeftEllipsis() {
      return this.showFirst && this.visiblePages[0] > 2;
    },
    showRightEllipsis() {
      return (
        this.showLast &&
        this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1
      );
    },
  },
  watch: {
    localItemsPerPage(newValue) {
      this.$emit("update:itemsPerPage", newValue);
      this.$emit("page-change", 1); // Reset to first page when changing items per page
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("page-change", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-bottom: 0;
}

.page-link {
  cursor: pointer;
  user-select: none;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  color: #6c757d;
  cursor: not-allowed;
}

select.form-select-sm {
  padding: 0.25rem 2rem 0.25rem 0.5rem;
}
</style>
