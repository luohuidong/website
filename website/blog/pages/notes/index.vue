<script setup lang="ts">
const {
  public: { blogServer },
} = useRuntimeConfig();

type List = {
  notebookDirName: string;
  notebookTitle: string;
  notebookConfig: {
    title: string;
    sidebar: {
      text: string;
      items: {
        text: string;
        link: string;
      }[];
    }[];
  }
}[]

const result = await $fetch<{
  list: List
}>(`${blogServer}/notes`);

function getLink(data: List[number]) {
  const firstPostLink = data.notebookConfig.sidebar[0].items[0].link
  return `/notes/${data.notebookDirName}/${encodeURIComponent(firstPostLink)}`
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <ul>
      <li
        v-for="item in result.list"
        :key="item.notebookDirName"
        class="flex h-10 items-center border-t px-5 text-neutral-500 last:border-b hover:bg-neutral-100 hover:text-neutral-600"
      >
        <NuxtLink :to="getLink(item)" class="w-full">
          {{ item.notebookTitle }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
