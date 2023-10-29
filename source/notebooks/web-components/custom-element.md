---
title: Custom elements
date: 2023-10-28
---

## 创建 custom element

创建 custom element 是 Web components 一个关键的功能。custom element 跟我们常用内建标签（如 `<div>`、`<span>`）都是 HTML 元素，只不过 custom element 的行为由开发者自己定义。

custom element 的定义通过类来实现，这个类继承自 `HTMLElement` 或者内建的 HTML 元素。如果 custom element 继承自 `HTMLElement`，则元素的所有功能都需要开发者重新实现。下面的例子展示了一个继承自 `HTMLElement` 的 custom element 的定义：

```ts
class PopupInfo extends HTMLElement {
  constructor() {
    super();
  }

  // 在此处编写自定义元素的功能
}
```

在 class 的 constructor 中，我们可以设置初始化状态以及默认值，注册事件监听器，创建 shadow DOM 等。但需要注意的是，在 constructor 中不能访问元素的属性以及子元素，因为在实例化的时候，custom element 还没有添加到文档中。

### custom element 生命周期回调

Custom element 包含几个生命周期回调：

- `connectedCallback()`：每当元素被添加到文档的时候被调用。
- `disconnectedCallback()`：每当元素从文档中移除的时候被调用。
- `adoptedCallback()`：每当元素被移动到新的文档的时候被调用。
- `attributeChangedCallback()`：每当元素的一个属性被增加、移除或者更改的时候被调用。

下面是 custom element 包含生命周期回调的最小实现：

```ts
class PopupInfo extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("popup-info", MyCustomElement);
```

### 响应属性变化

与内建元素类似，自定义元素能够使用 HTML 属性去配置元素的行为。

## 注册 Custom element

为了使得 custom element 可以在页面上正常使用，需要通过 `Window.customElements` 对象的 `define()` 方法对 customer element 进行注册。`define()` 方法接收三个参数：

- `name`：自定义元素的名称，必须包含一个短横线，比如 `popup-info`。
- `constructor`：自定义元素的构造函数
- `options`：仅在 custom element 继承自内建元素的时候使用。该对象仅包含 `extends` 属性，值为扩展的内建元素的名称。

```ts
customElements.define("popup-info", PopupInfo);
```

## 使用 Custom element

当定义和注册了 custom element 之后，就可以在页面上使用了。

```html
<popup-info></popup-info>
```
