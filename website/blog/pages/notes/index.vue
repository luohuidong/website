<script setup lang="ts">
const {
  public: { blogServer },
} = useRuntimeConfig();

const result = await $fetch<{
  list: {
    noteDirName: string;
    noteTitle: string;
  }[];
}>(`${blogServer}/notes`);
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <ul>
      <li
        v-for="item in result.list"
        :key="item.noteDirName"
        class="flex h-10 items-center border-t px-5 text-neutral-500 last:border-b hover:bg-neutral-100 hover:text-neutral-600"
      >
        <NuxtLink :to="`/notes/${item.noteDirName}`" class="w-full">
          {{ item.noteTitle }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
