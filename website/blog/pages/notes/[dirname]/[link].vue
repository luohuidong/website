<script setup lang="ts">
const params = useRoute().params;
const notedirname = params.dirname as string;
const postlink = params.link as string;

const {
  public: { blogServer },
} = useRuntimeConfig();

const result = await $fetch<{
  data: {
    meta: {
      title: string;
      date: string;
    };
    content: string;
  };
}>(`${blogServer}/notes/${notedirname}/${postlink}`);
</script>

<template>
  <div class="flex">
    <div class="flex-1">
      <NotePostList :notedirname="notedirname"></NotePostList>
    </div>

    <div class="max-w-4xl px-5">
      <Post
        class="flex-1"
        :title="result.data.meta.title"
        :date="result.data.meta.date"
        :content="result.data.content"
      ></Post>
    </div>

    <div class="flex-1"></div>
  </div>
</template>
