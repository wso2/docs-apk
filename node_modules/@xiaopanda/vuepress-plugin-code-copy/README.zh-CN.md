# @xiaopanda/vuepress-plugin-code-copy

[![NPM version](https://badgen.net/npm/v/@xiaopanda/vuepress-plugin-code-copy)](https://npmjs.com/package/@xiaopanda/vuepress-plugin-code-copy) 
[![NPM downloads](https://badgen.net/npm/dm/@xiaopanda/vuepress-plugin-code-copy)](https://npmjs.com/package/@xiaopanda/vuepress-plugin-code-copy) 
[![NPM LICENSE](https://badgen.net/npm/license/@xiaopanda/vuepress-plugin-code-copy)](https://github.com/panxingcheng/vuepress-plugin-code-copy/blob/master/LICENSE)

[English](./README.md) | [中文](./README.zh-CN.md)

> 一键复制代码块的 VuePress 插件。

## 安装

```bash
yarn add -D @xiaopanda/vuepress-plugin-code-copy
# OR 
npm install -D @xiaopanda/vuepress-plugin-code-copy
```

## 使用
该插件需要添加到 VuePress 项目中 `.vuepress/config.js` 下的 `plugins` 中：

```js
module.exports = {
  plugins: ['@xiaopanda/vuepress-plugin-code-copy'] 
}
```

## 选项
该插件带有许多选项，可以在 `plugins` 下的 `options` 对象中进行配置：

```js
module.exports = {
  plugins: [
    ['@xiaopanda/vuepress-plugin-code-copy', {
        buttonStaticIcon: Boolean,
        buttonIconTitle: String,
        buttonAlign: String,
        buttonColor: String
       }
    ]
  ]
}
```

### buttonStaticIcon

* 类型: `Boolean`
* 默认值: `false`

“复制”按钮仅在将鼠标悬停在代码块上时可见，或者始终可见。

### buttonIconTitle

* 类型: `String`
* 默认值: `Copy`

当鼠标悬停在“复制”按钮上时，标题内容将出现。

### buttonAlign

* 类型: `String`
* 默认值: `top`
* 支持选项: `top` 或 `bottom`

“复制”按钮在代码块的右上角或右下角对齐。

### buttonColor

* 类型: `String`
* 默认值: `#ffffff`

“复制”按钮的颜色，可以设置任何[十六进制颜色代码](https://htmlcolorcodes.com/)。

## 许可证

[MIT](./LICENSE)