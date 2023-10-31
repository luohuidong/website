---
title: Shadow DOM
date: 2023-10-29
---

custom element 一个重要的作用就是封装可复用的逻辑，为了让这些封装的逻辑能够不受页面运行的 JavaScript 和 CSS 代码的影响，就需要借助 shadow DOM。shadow DOM 可以防止页面的 JavaScript 和 CSS 影响到 shadow DOM tree 中的内容。

shadow DOM tree 涉及 shadow host、shadow tree、shadow boundary、shadow root 这几个概念，通过下面的图片来理清它们之间的关系：

![shadow dom](https://cdn.luohuidong.cn/clipboard_20231029_125707.png)

- Shadow host：作为 shadow DOM 所依附的 DOM 节点
- Shadow tree：指 shadow DOM 中的 DOM tree
- Shadow boundary：指常规节点的开始到 shadow DOM 结束的范围
- Shadow root：shadow tree 的根节点，即 shadow host

shadow DOM 可以将一个 DOM tree（即图中的 shadow tree）绑定到一个元素上，shadow DOM 对于页面正在运行的 JavaScript 和 CSS 是不可见的，这种特性可以确保 shadow DOM 之外运行的 JavaScript 和 CSS 不会影响到 shadow DOM 中的内容。同样 shadow DOM 中的代码也不会影响到 shadow DOM 之外的内容。

对 shadow DOM 的操作跟普通的 DOM 没什么不同，但需要注意的是页面的 JS 以及 CSS 并不会影响到 shadow DOM 内部的节点。
