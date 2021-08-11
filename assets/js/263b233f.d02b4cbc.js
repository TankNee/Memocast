"use strict";(self.webpackChunkmemocast_document=self.webpackChunkmemocast_document||[]).push([[713],{1580:function(n,e,t){t.r(e),t.d(e,{frontMatter:function(){return r},contentTitle:function(){return d},metadata:function(){return m},toc:function(){return s},default:function(){return c}});var a=t(7462),i=t(3366),o=(t(7294),t(3905)),l=["components"],r={slug:"loading-optimiazation",title:"Loading \u7ec4\u4ef6\u4f18\u5316\u601d\u8def",author:"TankNee",author_title:"Memocast core developer",author_url:"https://github.com/TankNee",author_image_url:"https://avatars.githubusercontent.com/u/43956168?v=4",tags:["memocast","loading-component"]},d=void 0,m={permalink:"/Memocast/blog/loading-optimiazation",editUrl:"https://github.com/TankNee/Memocast/edit/documentation/blog/2021-08-09-loading-optimization.md",source:"@site/blog/2021-08-09-loading-optimization.md",title:"Loading \u7ec4\u4ef6\u4f18\u5316\u601d\u8def",description:"\u8ba9 Loading \u7ec4\u4ef6\u66f4\u52a0\u7075\u52a8",date:"2021-08-09T00:00:00.000Z",formattedDate:"August 9, 2021",tags:[{label:"memocast",permalink:"/Memocast/blog/tags/memocast"},{label:"loading-component",permalink:"/Memocast/blog/tags/loading-component"}],readingTime:.495,truncated:!1,nextItem:{title:"\u6b22\u8fce\u6765\u5230 Memocast \u7684\u5f00\u53d1\u535a\u5ba2",permalink:"/Memocast/blog/Welcome"}},s=[{value:"\u8ba9 Loading \u7ec4\u4ef6\u66f4\u52a0\u7075\u52a8",id:"\u8ba9-loading-\u7ec4\u4ef6\u66f4\u52a0\u7075\u52a8",children:[]}],p={toc:s};function c(n){var e=n.components,t=(0,i.Z)(n,l);return(0,o.kt)("wrapper",(0,a.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"\u8ba9-loading-\u7ec4\u4ef6\u66f4\u52a0\u7075\u52a8"},"\u8ba9 Loading \u7ec4\u4ef6\u66f4\u52a0\u7075\u52a8"),(0,o.kt)("p",null,"Quasar \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"Loading")," \u5bf9\u8c61\u4e2d\u6709\u4e00\u4e2a\u53c2\u6570\u540d\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"delay")," \uff0c\u8fd9\u4e2a\u503c\u4ee3\u8868\u5982\u679c\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"delay")," \u6beb\u79d2\u5185\u63a5\u6536\u5230 ",(0,o.kt)("inlineCode",{parentName:"p"},"Loading.hide()")," \u90a3\u4e48\u5c31\u4e0d\u53bb\u6e32\u67d3 Loading \u7ec4\u4ef6\uff0c\u7528\u6237\u5c31\u4e0d\u4f1a\u770b\u5230\u52a0\u8f7d\u7684\u8fc7\u7a0b\u3002\u4ee5\u524d\u6211\u90fd\u662f\u76f4\u63a5\u7b80\u5355\u7c97\u66b4\u5730\u5728\u8017\u65f6\u64cd\u4f5c\u4e4b\u524d\u52a0\u4e0a ",(0,o.kt)("inlineCode",{parentName:"p"},"Loading.show()"),"\uff0c\u8017\u65f6\u64cd\u4f5c\u7ed3\u675f\u4e86\u5c31\u52a0\u4e0a ",(0,o.kt)("inlineCode",{parentName:"p"},"Loading.hide()")," \uff0c\u5f88\u7b80\u5355\u7684\u903b\u8f91\uff0c\u4f46\u662f\u6700\u7ec8\u7684\u6548\u679c\u4e0d\u597d\uff0c\u56e0\u4e3a\u6bcf\u4e00\u6b21\u90fd\u4f1a\u6e32\u67d3 ",(0,o.kt)("inlineCode",{parentName:"p"},"Loading")," \u6837\u5f0f\uff0c\u8ba9\u7528\u6237\u89c9\u5f97\u52a0\u8f7d\u901f\u5ea6\u592a\u6162\uff0c\u4f1a\u89c9\u5f97\u5361\u987f\uff0c\u800c\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"delay")," \u4e4b\u540e\uff0c\u5c0f\u7684\u6570\u636e\u52a0\u8f7d\u91cf\u57fa\u672c\u4e0a\u4e0d\u4f1a\u6709\u52a0\u8f7d\u52a8\u753b\uff0c\u5728\u89c6\u89c9\u4e0a\u63d0\u5347\u4e86\u5e94\u7528\u6d41\u7545\u7a0b\u5ea6\u3002\n\u7136\u540e\u6211\u5728\u81ea\u5df1\u7684\u52a0\u8f7d\u7ec4\u4ef6\u4e2d\u7b80\u5355\u7684\u5b9e\u73b0\u4e86\u4e00\u4e0b\uff0c\u6548\u679c\u786e\u5b9e\u4e0d\u9519\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'<template>\n  <q-inner-loading :showing="isLoading">\n    <q-spinner-ball style="color:var(--themeColor)" size="6em" />\n  </q-inner-loading>\n</template>\n\n<script>\nexport default {\n  name: \'Loading\',\n  props: {\n    visible: Boolean,\n    delay: {\n      type: Number,\n      default: 200\n    }\n  },\n  data () {\n    return {\n      isLoading: false,\n      timer: null\n    }\n  },\n  watch: {\n    visible (val) {\n      if (val) {\n        this.timer = setTimeout(() => {\n          this.isLoading = true\n        }, this.delay)\n      } else {\n        clearTimeout(this.timer)\n        this.isLoading = false\n      }\n    }\n  }\n}\n<\/script>\n\n<style scoped></style>\n')),(0,o.kt)("p",null,"\u5b9e\u73b0\u7684\u529e\u6cd5\u4e5f\u6bd4\u8f83\u7b80\u5355\uff0c\u5c31\u662f\u76d1\u542c\u7ec4\u4ef6 ",(0,o.kt)("inlineCode",{parentName:"p"},"visible")," \u503c\u5f97\u53d8\u5316\uff0c\u8fd9\u4e2a\u503c\u7531\u4e0a\u4e00\u5c42\u7684\u7ec4\u4ef6\u63d0\u4f9b\u6216\u8005\u4fee\u6539\uff0c\u5f53\u8fd9\u4e2a\u503c\u53d8\u5316\u7684\u65f6\u5019\u542f\u52a8\u4e00\u4e2a\u5b9a\u65f6\u5668\uff0c\u5982\u679c\u5728\u5b9a\u65f6\u5668\u65f6\u95f4\u5185\u6536\u5230\u4e86\u53d6\u6d88\u503c\uff0c\u90a3\u4e48\u5c31\u662f\u76f4\u63a5\u505c\u6b62\u8ba1\u65f6\uff0c\u4e5f\u5c31\u662f\u7ec4\u7ec7\u7ec4\u4ef6\u672a\u6765\u7684\u6e32\u67d3\u3002"))}c.isMDXComponent=!0}}]);