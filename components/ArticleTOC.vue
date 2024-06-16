<script setup lang="ts">
import type { TocLink } from "@nuxt/content/types";

const props = defineProps<{
  data?: TocLink[];
}>();
console.log("data", props.data);
</script>

<template>
  <ul class="pl-3">
    <li v-for="item in data" :key="item.id">
      <a
        :href="`#${item.id}`"
        class="block truncate text-sm leading-7 text-neutral-500 transition-colors hover:text-neutral-700"
      >
        {{ item.text }}
      </a>

      <ArticleTOC :data="item.children"></ArticleTOC>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
