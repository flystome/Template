# 预编译静态模板

**何谓纯静态预编译模板？**

所谓纯静态是指，无论开发环境，程序员以什么样的套路去开发，生产环境的文件为html, js, css 格式的文件，并能在file协议下查看全部效果。

预编译，即各种（如 less, coffee, jade等）文件进入测试环境时，已经编译成html, js, css 格式的文件。

## 目录结构定义

``` dir-tree
.
├── gulpfile.js
├── package.json
├── _config
│   └── www
├── build
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── dist
└── src
    ├── assets
    │   ├── style
    │   ├── script
    │   ├── plugin
    │   └── images
    ├── inc
    └── index.html
```

## 任务定义
