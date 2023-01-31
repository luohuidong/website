<script setup lang="ts">
const {
  public: { blogServer },
} = useRuntimeConfig();
const params = useRoute().params;
const result = await $fetch<{
  title: string;
  date: string;
  content: string;
}>(`${blogServer}/post/${params.name}`);

const { title, date, content } = result;
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <Post :title="title" :date="date" :content="content"></Post>
  </div>
</template>
