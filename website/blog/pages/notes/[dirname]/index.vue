<script setup lang="ts">
const params = useRoute().params;
const notedirname = params.dirname as string;
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <NotePostList :notedirname="notedirname"></NotePostList>
  </div>
</template>
