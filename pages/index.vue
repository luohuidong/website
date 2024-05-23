<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
useHead({
  title: "首页",
});
interface Blog extends ParsedContent {
  date: string;
  tags: string[];
}
const { data } = await useAsyncData("home", () =>
  queryContent<Blog>("/blog").sort({ date: 1 }).limit(20).find(),
);
</script>

<template>
  <div class="mx-auto max-w-md pt-4">
    <ul class="mt-10">
      <div v-for="item in data" :key="item._path" class="flex">
        <NuxtLink :to="item._path">
          <div class="group mb-4 flex gap-3">
            <div>
              <span class="text-gray-600 group-hover:text-gray-950">
                {{ item.title }}
              </span>
            </div>

            <div>
              <span class="mr-6 text-xs text-gray-300">
                {{ formatDate(item.date) }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </ul>
  </div>
</template>
