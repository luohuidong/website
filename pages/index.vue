<script setup lang="ts">
const blogQuery = queryContent("blog");
const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation(blogQuery),
);

console.log("navigation", navigation);
</script>

<template>
  <div class="mx-auto max-w-md pt-4">
    <ul class="mt-10">
      <ContentNavigation v-slot="{ navigation }" :query="blogQuery">
        <div
          v-for="item in navigation[0].children"
          :key="item._path"
          class="flex"
        >
          <NuxtLink :to="item._path">
            <div class="mb-4">
              <span class="text-gray-600">{{ item.title }}</span>
            </div>
          </NuxtLink>
        </div>
      </ContentNavigation>
    </ul>
  </div>
</template>
