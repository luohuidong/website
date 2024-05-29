<template>
  <div class="mx-auto max-w-3xl">
    <ContentDoc v-slot="{ doc }">
      <Article :title="doc.title" :date="formatDate(doc.date)">
        <ContentRenderer :value="doc" />
      </Article>
    </ContentDoc>
  </div>
</template>
