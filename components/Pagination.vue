<template>
  <div>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <ul class="pagination-list">
        <li>
          <a class="pagination-link" :class="{'is-disabled': currentPage <= 1}" @click="prevPage">Previous</a>
        </li>
        <li>
          <a class="pagination-link" :class="{'is-disabled': currentPage >= totalPages}" @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps(['totalItems', 'itemsPerPage', 'currentPage']);
const totalPages = Math.round(props.totalItems / props.itemsPerPage);
const currentPage = ref(parseInt(props.currentPage));
const router = useRouter();

function nextPage() {
  currentPage.value = currentPage.value >= totalPages ? currentPage.value : parseInt(currentPage.value) + 1;
  router.push({query: {currentPage: currentPage.value}});
}

function prevPage() {
  currentPage.value = currentPage.value <= 1 ? currentPage.value : parseInt(currentPage.value) - 1;
  router.push({query: {currentPage: currentPage.value}});
}

</script>

<style lang="scss" scoped>
  .pagination-list {
    justify-content: center;
  }
</style>