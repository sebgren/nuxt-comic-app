<template>
  <div>
    <div class="modal" :class="{'is-active': isOpen}">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="image modal-image">
          <img class="fluid-img" :src="props.comic.img" :title="props.comic.alt">
        </div>
      </div>
      <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['comic', 'isOpen']);
const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
  document.documentElement.classList.remove('is-clipped');
}
</script>

<style lang="scss" scoped>
  .fluid-img {
    height: 100%;
    width: auto;
  }
  .modal-image {
    display: flex;
    justify-content: center;
  }
</style>