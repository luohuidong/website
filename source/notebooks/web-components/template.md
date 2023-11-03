# 使用 template 和 slot

`<template>` 能让我们以更加简单的方式在页面上重复使用某些标签结构。`<template>` 中的内容并不会渲染在页面上，但可以通过 JavaScript 获取 `<template>` 的引用。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static</title>
  </head>
  <body>
    <template id="my-paragraph">
      <p>My paragraph</p>
    </template>

    <script>
      let template = document.getElementById("my-paragraph");
      let templateContent = template.content;
      document.body.appendChild(templateContent);
    </script>
  </body>
</html>
```

上面的例子有一点需要注意的，就是将 `<template>` 中的内容插入到 body 之后，`<template>` 里面的内容就会被移除。
