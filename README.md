# formula-edit

此工程为公式在线编辑demo，实现数学复杂公式的直接选择.

只需要修改替换参数为具体数字，即可实现公式的插入渲染。

修改对应文本框内容，可以实时预览。

基于 `latex` 和 `MathJax` 实现的。

## 具体效果

![result2](https://github.com/zzugbb/formula-edit/blob/master/img/result2.jpg)

![result1](https://github.com/zzugbb/formula-edit/blob/master/img/result1.jpg)


## 说明

此demo主要运用了 `MathJax` 及 `layer` 组件。 公式是 `latex` 语法形式。

工程中的 `MathJax` 则是根据自身需要抽出的简化版的。

## latex

`latex` 是一种基于ΤΕΧ的排版系统 , 利用这种格式，可以充分发挥由TeX所提供的强大功能，

`latex公式` 则是有特殊符号（$或其它）开头结尾的符号组合，不同符号组合代表数学中的不同特殊符号, 通过特殊的识别机制，可以在页面上展示出对应的实际符号。

## MathJax

`MathJax` 是一个 `JavaScript` 引擎，用来显示网络上的数学公式, 它可以工作于所有流行的浏览器上。

可以对 `latex` 公式代码识别，进行实际渲染。

## 参考资料

* [MathJax@官网](https://www.mathjax.org/)
* [MathJax@github](https://github.com/mathjax/MathJax)
* [前端整合MathjaxJS的配置笔记@segmentfault](https://segmentfault.com/a/1190000008317350)
* [MathJax 瘦身记@segmentfault](https://segmentfault.com/a/1190000003822609)
