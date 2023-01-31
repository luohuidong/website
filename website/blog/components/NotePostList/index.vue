<script setup lang="ts">
const props = defineProps<{
  notedirname: string;
}>();

const route = useRoute();

const {
  public: { blogServer },
} = useRuntimeConfig();

const result = await $fetch<{
  data: {
    title: string;
    sidebar: {
      text: string;
      items: {
        text: string;
        link: string;
      }[];
    }[];
  };
}>(`${blogServer}/notes/${props.notedirname}`);
</script>

<template>
  <div class="w-full">
    <div
      class="min-h-16 mb-5 flex items-center text-lg font-bold text-neutral-700"
    >
      <h1>
        {{ result.data.title }}
      </h1>
    </div>

    <ul>
      <li
        v-for="item in result.data.sidebar"
        :key="item.text"
        class="border-t pt-2"
      >
        <h2 class="min-h-8 py-1 text-sm font-bold leading-6 text-neutral-700">
          {{ item.text }}
        </h2>

        <ul>
          <li
            v-for="subItem in item.items"
            :key="subItem.link"
            class="min-h-8 py-1 text-sm leading-6 text-neutral-500"
          >
            <NuxtLink
              :to="`/notes/${notedirname}/${encodeURIComponent(subItem.link)}`"
              class="hover:text-[#10b981]"
              :class="{ 'text-[#10b981]': route.params.link === subItem.link }"
            >
              {{ subItem.text }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
