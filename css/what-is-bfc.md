# What is BFC


BFC 

Block Formatting Context 块级格式化上下文。BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，外部的元素也不会影响到



## 布局规则

1. 内部的box 在垂直方向，一个接一个放置；
2. 垂直方向的距离由margin 决定， 属于同一个bfc 的盒子的margin 会重叠；



## 生成BFC

1. 根元素
2. 浮动元素 float 不为none
3. 绝对定位： positon(absolute/fixed)
4. display (inline-block、table-cell、flex)
5. overflow 不为 visible

