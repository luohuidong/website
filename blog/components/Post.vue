<script setup lang="ts">
defineProps<{
  title: string;
  date: string;
  content: string;
}>();
</script>

<template>
  <div class="w-full">
    <h1 class="mb-6 mt-4 text-center text-4xl font-bold text-neutral-700">
      {{ title }}
    </h1>

    <div class="mb-10 text-center">
      <time :datetime="date" class="text-neutral-700">{{ date }}</time>
    </div>

    <div :class="$style.postArea">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<style lang="scss" module>
.postArea {
  * {
    color: rgba(60, 60, 67, 0.92);
  }

  h2 {
    margin: 60px 0 30px 0;
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
  }

  h3 {
    margin: 40px 0 30px 0;
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
  }

  h4 {
    margin: 30px 0;
    font-size: 18px;
    line-height: 28px;
  }

  p {
    margin-bottom: 30px;
  }

  p > code,
  li > code {
    padding: 3px 6px;
    background: #f6f6f7;
    font-size: 14px;
    color: #476582;
    border-radius: 4px;
  }

  > div > pre {
    margin-bottom: 30px;

    > code {
      display: flex;

      pre[class*="shiki"] {
        flex: 1;
        padding: 20px;
        border-radius: 5px;
      }
    }
  }

  a {
    color: #10b981;
    font-weight: 500;
  }

  ul,
  ol {
    padding-left: 26px;
    margin-bottom: 30px;

    > li {
      margin-bottom: 8px;
      color: rgba(60, 60, 67, 0.92);
    }
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  table {
    width: 100%;
    margin-bottom: 30px;

    td,
    th {
      border: 1px solid #ddd;
      padding: 8px;
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #f2f2f2;
    }
  }
}
</style>
