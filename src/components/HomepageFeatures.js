import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '强大的源代码模式',
    img: require('../../static/img/source.png').default,
    description: (
      <>
        Memocast 使用 Monaco 作为源代码模式下的编辑器，Monaco 是 Visual Studio Code 所使用的编辑器，拥有许多强大的功能，查找替换，多光标，代码语法高亮等。
      </>
    ),
  },
  {
    title: '精心优化的笔记编辑器',
    img: require('../../static/img/main.png').default,
    description: (
      <>
        Memocast 使用 muya 作为笔记编辑器，它来自于 MarkText 项目，拥有许多快捷输入方式，例如输入 <code>@</code> 可以打开输入面板，点击段落前的图标可以打开段落调整面板等。
      </>
    ),
  },
  {
    title: '多语言，明暗主题以及更多...',
    img: require('../../static/img/settings.png').default,
    description: (
      <>
        与此同时，Memocast 也提供了多样的选择，你可以自由选择 Memocast 主题样式，可以选择软件语言，调整图片服务，你甚至可以使用 PicGo 上传你要插入的笔记图片！
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={img} className={styles.featureImg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
