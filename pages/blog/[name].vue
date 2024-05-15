<script setup lang="ts"></script>

<template>
  <div class="mx-auto max-w-3xl">
    <ContentDoc v-slot="{ doc }">
      <Article :title="doc.title">
        <ContentRenderer :value="doc" />
      </Article>
    </ContentDoc>
  </div>
</template>
