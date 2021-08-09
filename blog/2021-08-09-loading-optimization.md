---
slug: loading-optimiazation
title: Loading 组件优化思路
author: TankNee
author_title: Memocast core developer
author_url: https://github.com/TankNee
author_image_url: https://avatars.githubusercontent.com/u/43956168?v=4
tags: [memocast, loading-component]
---

## 让 Loading 组件更加灵动

Quasar 的 `Loading` 对象中有一个参数名为 `delay` ，这个值代表如果在 `delay` 毫秒内接收到 `Loading.hide()` 那么就不去渲染 Loading 组件，用户就不会看到加载的过程。以前我都是直接简单粗暴地在耗时操作之前加上 `Loading.show()`，耗时操作结束了就加上 `Loading.hide()` ，很简单的逻辑，但是最终的效果不好，因为每一次都会渲染 `Loading` 样式，让用户觉得加载速度太慢，会觉得卡顿，而使用 `delay` 之后，小的数据加载量基本上不会有加载动画，在视觉上提升了应用流畅程度。
然后我在自己的加载组件中简单的实现了一下，效果确实不错。

```js
<template>
  <q-inner-loading :showing="isLoading">
    <q-spinner-ball style="color:var(--themeColor)" size="6em" />
  </q-inner-loading>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    visible: Boolean,
    delay: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      isLoading: false,
      timer: null
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.timer = setTimeout(() => {
          this.isLoading = true
        }, this.delay)
      } else {
        clearTimeout(this.timer)
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped></style>
```

实现的办法也比较简单，就是监听组件 `visible` 值得变化，这个值由上一层的组件提供或者修改，当这个值变化的时候启动一个定时器，如果在定时器时间内收到了取消值，那么就是直接停止计时，也就是组织组件未来的渲染。