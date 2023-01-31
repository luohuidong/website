<script setup lang="ts">
const {
  public: { blogServer },
} = useRuntimeConfig();
const { list } = await $fetch<{
  list: {
    filename: string;
    title: string;
    date: string;
    tags: string[] | null;
  }[];
}>(`${blogServer}/posts`);
</script>

<template>
  <div class="mx-auto max-w-3xl pt-4">
    <ul class="mt-10">
      <li v-for="item in list" :key="item.date" class="mb-2">
        <NuxtLink :to="`/post/${item.filename}`">
          <div class="flex flex-col rounded p-4 hover:bg-slate-50">
            <h2 class="mb-4 text-xl font-bold underline">{{ item.title }}</h2>
            <time :date="item.date" class="mb-2 text-sm text-gray-500">
              {{ item.date }}
            </time>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
