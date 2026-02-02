# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 **Nuxt 3** 构建的现代化个人博客系统,采用 **Nuxt Content** 模块实现基于 Markdown 的内容管理。项目集成了 **@nuxt/ui** 提供精美的 UI 组件,并包含一个自定义的 CMS 上传功能。

### 技术栈
- **Nuxt 3**: Vue 3 全栈框架
- **@nuxt/content**: 文件驱动的内容管理系统
- **@nuxt/ui**: Nuxt UI 组件库
- **Tailwind CSS**: 实用优先的 CSS 框架(通过 @nuxtjs/tailwindcss)
- **h3-formidable**: 服务端表单/文件解析

## 常用命令

### 开发
```bash
npm run dev          # 启动开发服务器 (http://localhost:3000)
```

### 构建
```bash
npm run build        # 构建生产版本
npm run generate     # 静态站点生成 (SSG)
npm run preview      # 本地预览生产构建
```

### 依赖管理
```bash
npm install          # 安装依赖 (会自动运行 nuxt prepare)
```

## 核心架构

### 目录结构
```
├── app.vue                  # 根组件
├── layouts/
│   └── default.vue          # 默认布局(导航栏、页脚、深色模式)
├── pages/
│   ├── index.vue            # 首页(展示个人介绍和最新文章)
│   ├── [category]/
│   │   ├── index.vue        # 分类列表页(如 /tech, /life, /stocks)
│   │   └── [slug].vue       # 文章详情页
│   └── admin.vue            # CMS 上传管理页面
├── server/api/
│   └── upload.post.ts       # 文件上传 API
└── content/
    ├── tech/                # 技术类文章
    ├── life/                # 生活类文章
    └── stocks/              # 投资类文章
```

### 内容系统 (@nuxt/content)

#### 内容文件格式
所有文章存储在 `content/` 目录下,使用 Markdown 格式:

```markdown
---
title: 文章标题
description: 文章描述
date: 2024-01-26
tags: [tag1, tag2, tag3]
---

# 文章正文

这里是 Markdown 内容...
```

#### 路由映射
- 内容文件: `content/tech/hello-world.md`
- 访问路径: `/tech/hello-world`
- 页面组件: `pages/[category]/[slug].vue`

#### 关键组件
- `<ContentDoc>`: 根据当前路由自动获取并渲染文档内容
- `<ContentRenderer>`: 手动渲染文档内容
- `<ContentList>`: 列出指定路径下的文档集合

### 页面路由系统

#### 1. 首页 (`pages/index.vue`)
- **布局**: bento grid 风格的响应式卡片布局
- **内容**:
  - 个人介绍卡片(2x2)
  - 分类快速入口卡片
  - 最新文章列表(使用 ContentList 查询)

#### 2. 分类列表页 (`pages/[category]/index.vue`)
- 使用 `ContentList` 查询特定分类下的文章
- 动态路由参数: `route.params.category`
- 支持的分类: `tech`, `life`, `stocks`

#### 3. 文章详情页 (`pages/[category]/[slug].vue`)
- 使用 `ContentDoc` 自动匹配路由
- 自动生成目录(Table of Contents)
- 响应式布局: 左侧文章内容 + 右侧固定侧边栏(桌面端)
- Prose 样式定制通过 Tailwind 类

### CMS 上传系统

#### 架构设计
这是一个**无数据库**的内容管理系统,通过以下方式工作:

1. **前端** (`pages/admin.vue`):
   - 提供表单界面上传 Markdown 文件
   - 支持元数据覆盖(标题、描述、日期、标签)
   - 需要输入 API Key 进行身份验证

2. **服务端 API** (`server/api/upload.post.ts`):
   - 使用 `h3-formidable` 解析 `multipart/form-data`
   - 自动解析/合并 Markdown Frontmatter
   - 将文件写入 `content/{category}/{slug}.md`
   - 自动执行 Git 同步(add → commit → push)

#### API 认证
- 通过 `Authorization: Bearer {API_KEY}` 头部验证
- API_KEY 来源(优先级):
  1. `runtimeConfig.apiKey` (nuxt.config.ts 中配置)
  2. 环境变量 `process.env.API_KEY`
  3. 默认值 `'default-dev-key'` (仅开发环境)

#### Git 自动同步
上传成功后自动执行:
```bash
git add content/
git commit -m "cms: auto upload content"
git push
```

**注意**: Git 操作异步执行,不阻塞 API 响应。

### 布局系统 (`layouts/default.vue`)

#### 关键功能
- **深色模式**: 通过 `@nuxt/ui` 的 `useColorMode()` 实现
- **响应式导航栏**: 移动端隐藏链接,桌面端显示
- **环境光效** (深色模式): 使用 `backdrop-blur` 和渐变光晕
- **固定布局**: 顶部固定导航 + 内容区域 + 底部页脚

#### 颜色主题
- **Tech 类别**: violet/blue 色调
- **Life 类别**: amber/yellow 色调
- **Stocks 类别**: emerald/green 色调

## 重要配置

### Nuxt 配置 (`nuxt.config.ts`)
```typescript
modules: [
  '@nuxt/content',    // 内容管理
  '@nuxt/ui'          // UI 组件库
],
runtimeConfig: {
  apiKey: process.env.API_KEY || 'default-dev-key'
}
```

### 环境变量
创建 `.env` 文件配置 API Key(生产环境必需):
```
API_KEY=your-secure-api-key-here
```

## 开发注意事项

### 内容创作
1. 在 `content/{category}/` 下创建 `.md` 文件
2. 确保 Frontmatter 包含必需字段: `title`, `description`, `date`
3. 图片放在 `public/` 目录或使用外部链接

### 添加新分类
1. 在 `content/` 下创建新文件夹
2. 在 `layouts/default.vue` 的导航栏中添加链接
3. 更新 `pages/admin.vue` 的分类选项

### 自定义样式
项目使用 Tailwind CSS,主要样式约定:
- 圆角: `rounded-3xl` (大卡片), `rounded-2xl` (小卡片)
- 毛玻璃: `backdrop-blur-xl` + `bg-white/50 dark:bg-zinc-900/40`
- 边框: `border-zinc-200 dark:border-white/10`
- 文本: `text-zinc-900 dark:text-zinc-100`

### Nuxt UI 组件
项目使用以下组件(通过 `@nuxt/ui`):
- `UButton`: 按钮
- `UInput`: 输入框
- `UTextarea`: 多行输入
- `USelect`: 下拉选择
- `UFormGroup`: 表单组
- `UDivider`: 分割线
- `UContainer`: 容器
- `UCard`: 卡片
- `UAlert`: 警告提示
- `UIcon`: 图标(使用 Heroicons)

## 性能优化要点

1. **图片优化**: 使用 `NuxtImage` 模块(未集成)可进一步优化
2. **静态生成**: 生产环境使用 `npm run generate` 进行 SSG
3. **代码分割**: Nuxt 3 自动处理路由级别代码分割
4. **深色模式**: 通过 `ClientOnly` 组件避免服务端渲染不匹配

## 生产环境部署

### 方案一：PM2 部署（推荐）

项目包含 `ecosystem.config.cjs` 配置文件，支持 PM2 集群模式部署。

#### 部署步骤
```bash
# 1. 构建项目
npm run build

# 2. 启动 PM2（集群模式，CPU 核心数实例）
pm2 start ecosystem.config.cjs

# 3. 查看状态
pm2 status

# 4. 查看日志
pm2 logs nuxt-blog

# 5. 重启服务
pm2 restart nuxt-blog

# 6. 停止服务
pm2 stop nuxt-blog
```

#### PM2 配置要点
- **端口**: 3000
- **集群模式**: `instances: 'max'` (自动使用所有 CPU 核心)
- **内存限制**: 500MB (超过自动重启)
- **日志**: 保存在 `./logs/` 目录

#### 环境变量设置
在 `ecosystem.config.cjs` 中或通过 `.env` 文件设置：
```javascript
env: {
  NODE_ENV: 'production',
  API_KEY: 'your-production-api-key'  // 必须设置！
}
```

### 方案二：Nginx 反向代理

项目包含 `nginx.conf.example` 配置示例，用于 Nginx 反向代理。

#### 配置要点
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 上传文件大小限制（CMS 功能需要）
    client_max_body_size 50m;
}
```

#### 启用配置
```bash
# 1. 复制配置文件
cp nginx.conf.example /etc/nginx/sites-available/blog-nuxt

# 2. 修改域名
vim /etc/nginx/sites-available/blog-nuxt  # 修改 server_name

# 3. 创建软链接
ln -s /etc/nginx/sites-available/blog-nuxt /etc/nginx/sites-enabled/

# 4. 测试配置
nginx -t

# 5. 重载 Nginx
systemctl reload nginx
```

### 方案三：静态站点部署 (SSG)

适合部署到 Vercel、Netlify、GitHub Pages 等平台。

```bash
# 1. 生成静态站点
npm run generate

# 2. 部署 .output/public 目录
# 例如：
# - Vercel: vercel deploy
# - Netlify: 拖拽 .output/public 目录到控制台
# - GitHub Pages: 配置 GitHub Actions 推送到 gh-pages 分支
```

**限制**: SSG 模式下 `/admin` 上传功能不可用（需要服务端 API）。

### 部署前检查清单

- [ ] 设置生产环境 `API_KEY`（.env 或 ecosystem.config.cjs）
- [ ] 配置 Git 仓库远程访问（CMS 自动提交需要）
- [ ] 设置 Nginx 反向代理（如使用 Nginx）
- [ ] 配置 PM2 自动重启（如使用 PM2）
- [ ] 测试 `/admin` 上传功能
- [ ] 验证深色模式切换
- [ ] 检查移动端响应式布局
- [ ] 确认所有分类页面正常（/tech, /life, /stocks）

## TypeScript 配置

项目使用 TypeScript，配置文件 `tsconfig.json` 继承自 Nuxt 自动生成的配置：

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

**注意**: `.nuxt/` 目录在 `nuxt prepare` 后自动生成，不要手动修改。

## Git 配置

### .gitignore 规则
项目忽略以下文件/目录：
- `.output/`, `.data/`, `.nuxt/`, `.nitro/`, `.cache/`, `dist/` (构建输出)
- `node_modules/` (依赖)
- `logs/` (PM2 日志)
- `.env`, `.env.*` (环境变量，除了 `.env.example`)
- `.DS_Store`, `.fleet/`, `.idea/` (系统文件)

### Git 自动提交流程

当通过 CMS (`/admin`) 上传文章时，系统自动执行：

```bash
git add content/
git commit -m "cms: auto upload content"
git push
```

**前提条件**:
- 服务器必须配置 Git 远程仓库访问权限
- 建议使用 SSH 密钥或 Personal Access Token
- 确保 `git push` 不需要交互式输入

## CMS 上传系统详解

### 设计理念
一个**无数据库**的智能内容管理系统，基于 Markdown 文件和 Git 版本控制。

### 元数据优先级规则

上传时的元数据合并优先级（从高到低）：

```
表单输入字段 > 文件内置 Frontmatter > 自动提取/默认值
```

#### 示例场景

**场景 A**: 表单输入 + 无 Frontmatter
```markdown
# 原始文件（无 Frontmatter）
这是文章正文...
```
表单输入: `title = "我的标题"`

**结果**:
```markdown
---
title: 我的标题
description: ""
date: 2024-01-26
tags: []
category: tech
---

这是文章正文...
```

**场景 B**: 仅文件 Frontmatter
```markdown
---
title: 文件标题
description: 文件描述
---
正文内容...
```
表单输入: 无任何输入

**结果**: 保留原有 Frontmatter，补充缺失的 `date` 和 `category`

**场景 C**: 裸文件（无 Frontmatter，无表单输入）
```markdown
# 这是标题

正文内容...
```

**结果**: 自动提取首行作为标题，生成默认元数据

### API 端点详解

#### POST /api/upload

**请求头**:
```
Authorization: Bearer {API_KEY}
Content-Type: multipart/form-data
```

**表单字段**:
- `file` (必需): Markdown 文件
- `category` (可选): 分类，默认 `'tech'`
- `slug` (可选): URL 路径名，默认使用文件名
- `title` (可选): 覆盖标题
- `description` (可选): 覆盖描述
- `date` (可选): 覆盖日期，格式 `YYYY-MM-DD`
- `tags` (可选): 逗号分隔的标签

**响应示例**:
```json
{
  "success": true,
  "path": "/content/tech/my-article.md",
  "data": {
    "title": "我的文章",
    "description": "文章描述",
    "date": "2024-01-26",
    "tags": ["nuxt", "vue"],
    "category": "tech"
  }
}
```

**错误响应**:
- `401 Unauthorized`: API Key 无效
- `400 Bad Request`: 未上传文件

### 安全建议

1. **生产环境**:
   - 使用强随机 API Key（至少 32 字符）
   - 通过环境变量设置，不要硬编码
   - 定期轮换 API Key

2. **Git 仓库**:
   - 确保内容仓库为私有（如果包含敏感信息）
   - 使用 SSH 密钥而非密码认证
   - 配置 `git config --global credential.helper store`

3. **Nginx 额外保护** (可选):
   ```nginx
   # 仅允许特定 IP 访问 /admin
   location /admin {
       allow 1.2.3.4;  # 你的 IP
       deny all;
       proxy_pass http://127.0.0.1:3000;
   }
   ```

## 故障排查

### 常见问题

#### 1. 上传失败 "Unauthorized"
- 检查 `.env` 文件中 `API_KEY` 是否设置
- 验证请求头格式: `Authorization: Bearer {key}`
- 确认环境变量加载正确（重启服务）

#### 2. Git 推送失败
- 检查服务器 SSH 密钥配置: `ssh -T git@github.com`
- 确认远程仓库 URL 正确: `git remote -v`
- 查看详细错误日志: `pm2 logs nuxt-blog`

#### 3. 文章页面 404
- 确认文件路径正确: `content/{category}/{slug}.md`
- 检查 Frontmatter 格式（必须是有效的 YAML）
- 重启开发服务器: `npm run dev`

#### 4. 样式不生效
- 清理缓存: `rm -rf .nuxt node_modules && npm install`
- 检查 Tailwind 类名拼写
- 确认 `@nuxt/ui` 模块正确加载

#### 5. PM2 进程频繁重启
- 查看内存使用: `pm2 monit`
- 检查内存限制配置（`max_memory_restart`）
- 查看错误日志: `tail -f logs/error.log`

## 开发工作流程

### 新增文章流程

#### 方法一：直接创建（推荐开发环境）
```bash
# 1. 在 content/ 目录下创建 Markdown 文件
touch content/tech/my-new-post.md

# 2. 编辑文件，添加 Frontmatter
vim content/tech/my-new-post.md
```

#### 方法二：通过 CMS 上传（推荐生产环境）
1. 访问 `http://localhost:3000/admin`
2. 输入 API Key（来自 `.env`）
3. 选择 Markdown 文件
4. 填写或覆盖元数据
5. 点击"立即发布"
6. 系统自动 Git 提交并推送

### 修改文章流程

#### 直接编辑
```bash
# 编辑现有文章
vim content/tech/existing-post.md

# 保存后立即生效（开发环境热更新）
# 生产环境需要重启 PM2：pm2 restart nuxt-blog
```

#### 通过 CMS 更新
- 上传同名文件将覆盖现有内容
- Slug 相同即视为同一篇文章

### 代码修改流程

```bash
# 1. 创建新分支（可选）
git checkout -b feature/new-feature

# 2. 修改代码
vim pages/index.vue

# 3. 测试改动
npm run dev

# 4. 提交代码
git add .
git commit -m "feat: add new feature"

# 5. 推送到远程
git push origin feature/new-feature
```

## 关键文件说明

### 配置文件

| 文件 | 用途 | 重要性 |
|------|------|--------|
| `nuxt.config.ts` | Nuxt 核心配置 | ⭐⭐⭐ |
| `tsconfig.json` | TypeScript 配置 | ⭐⭐⭐ |
| `ecosystem.config.cjs` | PM2 进程管理配置 | ⭐⭐ (生产环境) |
| `nginx.conf.example` | Nginx 反向代理示例 | ⭐⭐ (生产环境) |
| `.env` | 环境变量（需手动创建） | ⭐⭐⭐ |
| `eslint.config.mjs` | ESLint 代码规范配置 | ⭐ |

### 核心源码文件

| 文件 | 职责 | 关键点 |
|------|------|--------|
| `app.vue` | 应用根组件 | 极简，仅包含布局和页面 |
| `layouts/default.vue` | 默认布局 | 导航、深色模式、页脚 |
| `pages/index.vue` | 首页 | Bento grid 布局、ContentList |
| `pages/[category]/[slug].vue` | 文章详情页 | ContentDoc、TOC、Prose 样式 |
| `pages/[category]/index.vue` | 分类列表页 | ContentList、动态路由 |
| `pages/admin.vue` | CMS 上传页面 | 表单、文件上传、API 调用 |
| `server/api/upload.post.ts` | 上传 API | 文件解析、Frontmatter 合并、Git 同步 |

## 最佳实践

### 1. 内容创作
- ✅ **Frontmatter 完整性**: 每篇文章至少包含 `title`, `description`, `date`
- ✅ **文件命名**: 使用小写字母和连字符，如 `my-awesome-post.md`
- ✅ **图片路径**: 优先使用 `/images/` 相对路径（需创建 `public/images/`）
- ✅ **标签规范**: 使用 2-4 个相关标签，便于检索

### 2. 代码规范
- ✅ **组件设计**: 单文件组件保持专注，单一职责
- ✅ **TypeScript**: 优先使用 TypeScript，添加类型注解
- ✅ **响应式**: 移动优先，使用 Tailwind 响应式前缀
- ✅ **性能**: 使用 `ClientOnly` 包含客户端特定组件

### 3. 安全实践
- ✅ **API Key**: 永远不要提交 `.env` 文件到 Git
- ✅ **权限控制**: 生产环境限制 `/admin` 访问（IP 白名单）
- ✅ **文件验证**: 上传前验证文件类型（.md）和大小
- ✅ **日志管理**: 定期清理 PM2 日志（`pm2 flush`）

### 4. Git 工作流
- ✅ **提交信息**: 使用 Conventional Commits 规范
  ```
  feat: 新功能
  fix: 修复 bug
  docs: 文档更新
  style: 代码格式
  refactor: 重构
  test: 测试相关
  chore: 构建/工具
  ```
- ✅ **分支策略**: 主分支（master）保持稳定，功能开发使用分支
- ✅ **提交频率**: CMS 自动提交内容，代码手动提交

### 5. 性能优化
- ✅ **图片**: 使用 WebP 格式，添加 width/height 属性
- ✅ **字体**: 使用系统字体栈，避免加载外部字体
- ✅ **代码分割**: Nuxt 3 自动处理，无需手动配置
- ✅ **缓存**: 利用 Nuxt 的缓存机制，避免重复渲染

## 主题定制

### 修改品牌颜色

编辑 `layouts/default.vue` 中的颜色类名：

```vue
<!-- 当前主题色 -->
- Tech: violet/blue (text-violet-600)
- Life: amber/yellow (text-amber-600)
- Stocks: emerald/green (text-emerald-600)
```

### 修改深色模式背景

编辑 `layouts/default.vue` 中的环境光效：

```vue
<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%]
            rounded-full bg-violet-900/20 blur-[120px]"></div>
```

可修改 `bg-violet-900` 为其他颜色。

### 修改 Prose 样式

编辑 `pages/[category]/[slug].vue` 中的 `prose` 类：

```vue
<div class="prose prose-lg prose-zinc dark:prose-invert max-w-none
  prose-headings:font-bold
  prose-a:text-violet-600">  <!-- 链接颜色 -->
```

## 依赖更新

### 更新 Nuxt 版本
```bash
# 检查可用更新
npm outdated

# 更新 Nuxt 核心
npm install nuxt@latest

# 更新 Nuxt 模块
npm install @nuxt/content@latest @nuxt/ui@latest
```

### 清理依赖
```bash
# 完全清理并重新安装
rm -rf node_modules package-lock.json .nuxt
npm install
```

## 调试技巧

### 1. 启用调试日志
```bash
# 开发环境启用详细日志
DEBUG=* npm run dev
```

### 2. 查看渲染数据
```vue
<!-- 在模板中临时添加 -->
<pre>{{ doc }}</pre>
```

### 3. 测试 API 端点
```bash
# 使用 curl 测试上传 API
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@test.md" \
  -F "category=tech"
```

### 4. 检查构建输出
```bash
# 构建后检查输出文件
ls -lh .output/server/index.mjs
node .output/server/index.mjs  # 手动运行测试
```

## 参考资源

### 官方文档
- [Nuxt 3 文档](https://nuxt.com/docs)
- [Nuxt Content 文档](https://content.nuxt.com)
- [Nuxt UI 文档](https://ui.nuxt.com)
- [Vue 3 文档](https://vuejs.org)
- [Tailwind CSS 文档](https://tailwindcss.com)

### 工具文档
- [PM2 文档](https://pm2.keymetrics.io)
- [h3-formidable](https://github.com/twlite/h3-formidable)

---

**文档版本**: 1.0.0
**最后更新**: 2026-02-02
**维护者**: Antigravity
