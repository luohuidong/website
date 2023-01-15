<script setup lang="ts">
const navs = [{ to: "/", text: "home" }];
</script>

<template>
  <div class="mx-auto flex min-h-screen w-3/4 flex-col">
    <header class="mx-auto flex h-24 w-3/4 items-center justify-between gap-3">
      <h1 class="text-center text-3xl font-bold">Life of coding</h1>

      <div>
        <NuxtLink
          v-for="item of navs"
          :to="item.to"
          class="text-neutral-400 underline"
        >
          {{ item.text }}
        </NuxtLink>
      </div>
    </header>

    <div class="flex-1">
      <slot></slot>
    </div>

    <footer class="mt-10 h-10 text-center">
      <a
        class="text-sm text-neutral-400 underline"
        href="https://beian.miit.gov.cn/"
        >粤ICP备18108480号-1</a
      >
    </footer>
  </div>
</template>
