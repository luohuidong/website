<template>
  <div class="w-full">
    <ContentDoc>
      <template #="{ doc }">
        <div class="flex">
          <div class="hidden 2xl:block 2xl:w-72"></div>

          <div class="flex-1">
            <Article
              :title="doc.title"
              :date="formatDate(doc.date)"
              :toc="doc.body?.toc"
            >
              <ContentRenderer :value="doc" />
            </Article>
          </div>

          <div class="hidden lg:block lg:w-72 lg:pt-10">
            <ArticleTOC
              class="sticky top-10"
              :data="doc.body?.toc?.links"
            ></ArticleTOC>
          </div>
        </div>
      </template>

      <template #not-found>
        <div class="mt-20 text-center">
          <h1 class="text-4xl font-bold">404</h1>
          <p class="mt-4 text-gray-600">Not Found</p>
        </div>
      </template>

      <template #empty>
        <h1>Document is empty</h1>
      </template>
    </ContentDoc>
  </div>
</template>
