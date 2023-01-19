<script setup lang="ts">
const params = useRoute().params;
const result = await $fetch(`/api/post/${params.name}`);
const { title, date, content } = result;
</script>

<template>
  <div class="mx-auto w-3/4">
    <h1 class="mt-4 mb-10 text-center text-4xl">{{ title }}</h1>
    <time :datetime="date"></time>

    <div class="postArea">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.postArea {
  :deep(h2) {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
  }

  :deep(h3) {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
  }

  :deep(p) {
    margin-bottom: 30px;
  }

  :deep(pre.shiki.nord) {
    display: block;
    padding: 20px;
    border-radius: 5px;
  }

  :deep(a) {
    color: blue;
  }
}
</style>
