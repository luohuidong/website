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
  <div class="flex justify-center">
    <div class="w-[300px]">
      <NotePostList :notedirname="notedirname"></NotePostList>
    </div>

    <div class="w-[900px] px-5">
      <Post
        :title="result.data.meta.title"
        :date="result.data.meta.date"
        :content="result.data.content"
      ></Post>
    </div>

    <div class="w-[300px]"></div>
  </div>
</template>
