---
title: Shadow DOM
date: 2023-10-29
---

Shadow DOM 可以将一个 DOM 树绑定到一个元素上，同时 shadow DOM 相对于外部不可见。

![shadow dom](https://cdn.luohuidong.cn/clipboard_20231029_125707.png)

概念：

- Shadow host：作为 shadow DOM 所依附的常规 DOM 节点
- Shadow tree：在 shadow DOM 中的 DOM tree
- Shadow boundary：常规节点的开始到 shadow DOM 结束的范围
- Shadow root：shadow tree 的根节点

对 shadow dom 的操作跟普通的 DOM 没什么不同，但需要注意的是页面的 JS 以及 CSS 并不会影响到 shadow DOM 内部的节点。

页面的 CSS 不影响 shadow DOM 中的元素，而 shadow DOM 中的样式也不影响页面的其他元素。
