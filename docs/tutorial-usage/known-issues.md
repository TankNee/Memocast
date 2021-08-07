---
sidebar_position: 4
---

# 已知问题

## 笔记只显示前 100 条

代码位置：https://github.com/TankNee/Memocast/blob/fe6d641994a397915ea07aeb12db3fd3b2b24fcf/src/store/server/actions.js#L202-L210

```js
const result = await api.KnowledgeBaseApi.getCategoryNotes({
     kbGuid,
     data: {
       category: category || currentCategory,
       start: start || 0,
       count: count || 100,
       withAbstract: true
     }
  })
```

需要加入滚动时加载以解决这个问题。

## 格式化破坏数据公式

使用 remark-pangu 对文章进行格式化的时候会让数学公式出现问题。

详情请查看这个 [issue](https://github.com/VincentBel/remark-pangu/issues/26)。

```mathematica
$$
X_3^2
$$
```

会变成

```mathematica
$$
X\_3^2
$$
```

也就是多了个转义符。

