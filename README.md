# electron-nestjs-vue

electron nestjs vue development

## 目录结构简要说明

- packages/main 主进程模块
- packages/preload 预加载代码模块
- packages/render 渲染进程模块

## 安装依赖

- 进入 `electron-nestjs-vue` 目录
- 执行 `npm i` 安装根依赖
- 执行 `ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/" npx lerna bootstrap` 安装 packages 目录下各模块的依赖.（环境变量主要是为了设置 electron 源，减少安装时间）

## 快速开发（抛开 electron 开发）

- 进入 `electron-nestjs-vue` 目录
- 执行 `npx lerna run watch` 命令
- 访问 `http://127.0.0.1:2999` 可测试服务端接口
- 访问 `http://127.0.0.1:5678` 可访问前台页面

## 基于 electron 开发

- 进入 `electron-nestjs-vue` 目录
- 执行 `npx lerna run dev` 命令
- 访问 `http://127.0.0.1:2999` 仍然可测试服务端接口
- 访问 `http://127.0.0.1:5678` 仍然可访问前台页面

## 打包

- 进入 `electron-nestjs-vue`
- 执行 `npx lerna run build`
- 进入 `electron-nestjs-vue/packages/main`
- 执行 `npm run build:app`
- 在 `electron-nestjs-vue/packages/main/dist/electron`目录可以找到打包后的文件
