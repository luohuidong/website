<script setup lang="ts">
const navs = [
  { to: "/", text: "首页" },
  { to: "https://github.com/luohuidong", text: "GitHub" },
];
</script>

<template>
  <div class="mx-auto flex min-h-screen w-3/4 flex-col">
    <header class="mx-auto flex h-24 w-3/4 items-center justify-end gap-3">
      <NuxtLink
        v-for="item of navs"
        :to="item.to"
        class="text-neutral-400 underline"
      >
        {{ item.text }}
      </NuxtLink>
    </header>

    <div class="flex-1">
      <slot></slot>
    </div>

    <footer class="mt-10 h-10 text-center">
      <a
        class="text-sm text-neutral-400 underline"
        href="https://beian.miit.gov.cn/"
      >
        粤ICP备18108480号-1
      </a>
    </footer>
  </div>
</template>
