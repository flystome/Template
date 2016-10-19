# Template Generator

> 前端开发模板生成器，旨在解决前端开发中，效率低下，重复任务，繁琐操作等常见问题。

TG 分为模板和生成器两部分。模板负责抽象日常开发中常见的模式，生成器负责根据项目具体的配置，生成适合当前项目的一系列起始文件。

## 模板

### 模板分类

根据项目的适用情况，可粗略分为以下几种：
1. 纯前端预编译 > 纯前端是指项目运行时不需要任何后端环境，像 GitHub Pages 及静态站就属于此类，且可以在本地以 file 协议运行。而预编译是指你可以用各种预处理语言来编写你的项目。
2. Http(s) 协议环境 > 和上面的相比，这个主要是为了支持 Ajax, Sockets 等网络通信的正常运行。如果托管在服务器上，和上面的没有任何区别。如果在本地环境浏览，会带上一个基于 Nodejs 的微型 server 环境。
3. 与后端结合 > 前端项目与后端结合时应该怎样组织，模板引擎应该怎样选择等等。这里会用 Nodejs 作为后端框架进行演示。

### 环境约定

当我们的工作进入高度流程化时，会有一些约定俗成的规则来帮助我们更好的协作。这里，我先给出模板制作时需要考虑的环境的一个参考：
1. 开发环境 > 指前端开发工作的环境，例如用less写样式，用coffee写脚本等等
2. 联调环境 （可选）> 经过必要处理后与后端开发进行联调的环境，主要是相关的前后端开发使用
3. 测试环境 > 测试人员进行项目测试的环境，前端文件已经变成 html, css, js 文件，测试人员可以在任何满足要求的机器上进行测试
4. 预发布环境 （可选）> 项目正式上线前，内网全体相关人员查看的环境，相关代码及文件已经进行过最小化压缩
5. 生产环境 > 正式对公网生效运营的环境，代码已压缩混淆

### 实例模板规则

#### 纯静态预编译模板

## 生成器

## 反馈

有发现 Bug 及任何改进的建议，请至 [Issues](https://github.com/x4storm/Template/issues) 进行反馈。
