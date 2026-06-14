# 张琬沁的学习与求职日记

多模态AI算法工程师 · 音乐×AI · 2026年求职中

## 博客地址

https://wanqinzhang.github.io

## 关于这个博客

这是一个简洁的个人博客，用于记录我的：
- 📚 学习进展（CS336、论文精读、LeetCode）
- 💼 面试经历（技术面试、行为面试、反思总结）
- 🎵 生活思考（音乐、职业转型、日常）

## 在线稿件管理系统

现在你可以直接在浏览器中编写和管理博客文章，无需手动编辑HTML文件！

### 快速开始

1. **打开管理页面**：在浏览器中打开 `manage.html`
2. **新建文章**：点击"+ 新建文章"按钮
3. **编写内容**：在左侧输入Markdown，右侧实时预览HTML
4. **保存文章**：填写标题、分类、标签等元数据后点击"保存"
5. **导出HTML**：点击"导出HTML"按钮，下载生成的HTML文件到 `posts/` 或 `drafts/` 文件夹

### 功能特性

#### 1. Markdown编辑器 (`editor.html`)
- **左右分栏**：左侧输入Markdown，右侧实时预览
- **元数据管理**：标题、分类（学习/面试记录/生活）、日期、标签
- **状态控制**：Private（草稿）/ Public（已发布）
- **文件上传**：支持上传 `.md` 文件，自动读取内容
- **实时预览**：输入延迟200ms后自动更新预览
- **导出功能**：
  - 导出HTML文件（包含完整样式）
  - 导出JSON数据（备份原始数据）

#### 2. 稿件管理 (`manage.html`)
- **文章列表**：表格展示所有文章（标题、分类、状态、日期、标签）
- **筛选功能**：全部 / 已发布 / 草稿
- **操作功能**：
  - 编辑：跳转到编辑器修改文章
  - 预览：在新窗口中预览HTML效果
  - 发布/撤回：切换文章状态
  - 导出HTML：下载单篇文章的HTML文件
  - 删除：删除文章（包含确认提示）
- **数据管理**：
  - 导出所有数据（JSON格式，用于备份）
  - 导入数据（从JSON文件恢复）

#### 3. 数据存储
- **localStorage存储**：所有文章数据存储在浏览器本地
- **自动备份**：每次保存时自动创建备份副本
- **Markdown保留**：保存原始Markdown和生成的HTML
- **元数据完整**：包括创建时间、更新时间等

### 使用流程

#### 方法一：在线编辑（推荐）

1. 打开 `manage.html` → 点击"新建文章"
2. 在编辑器中输入Markdown内容
3. 填写标题、分类、标签等信息
4. 选择状态（Private草稿 / Public已发布）
5. 点击"保存"
6. 点击"导出HTML"，将生成的HTML文件保存到 `posts/` 或 `drafts/` 文件夹
7. 更新 `index.html` 添加文章链接
8. 提交到GitHub

#### 方法二：传统方式（手动编辑HTML）

1. 在 `posts/` 文件夹中创建新文件，格式：`YYYY-MM-DD-标题.html`
2. 复制 `posts/2026-06-14-start-cs336.html` 作为模板
3. 编辑文件内容
4. 更新 `index.html` 添加文章链接
5. 提交到GitHub

### 数据备份

为了保证数据安全，建议定期导出数据：

1. 打开 `manage.html`
2. 点击"导出所有数据"按钮
3. 保存JSON文件到安全位置（如云盘、Git仓库）

恢复数据：
1. 打开 `manage.html`
2. 点击"导入数据"按钮
3. 选择之前导出的JSON文件

### Markdown支持

编辑器支持以下Markdown语法：

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体** 和 *斜体*

- 无序列表
- 列表项2

1. 有序列表
2. 列表项2

[链接文本](https://example.com)

> 引用文本

`行内代码`

​```
代码块
​```
```

### 注意事项

1. **浏览器兼容性**：推荐使用Chrome、Firefox、Edge等现代浏览器
2. **数据存储**：数据存储在浏览器localStorage中，清除浏览器数据会丢失，请定期备份
3. **文件导出**：导出的HTML文件需要手动放置到 `posts/` 或 `drafts/` 文件夹
4. **首页更新**：导出HTML后仍需手动更新 `index.html` 添加文章链接
5. **Git提交**：完成编辑后记得提交到GitHub触发部署

## 如何添加新文章（传统方式）

### 1. 创建文章HTML文件

在 `posts/` 文件夹中创建新文件，格式：`YYYY-MM-DD-标题.html`

例如：`2026-06-15-clip-paper-reading.html`

可以复制 `posts/2026-06-14-start-cs336.html` 作为模板。

### 2. 更新首页

编辑 `index.html`，在对应板块（学习/面试记录/生活）添加新的 `post-item`：

```html
<div class="post-item">
  <div class="post-meta">2026年6月15日 · 第2天</div>
  <div class="post-title">
    <a href="posts/2026-06-15-clip-paper-reading.html">CLIP论文精读：视觉-语言对齐的奠基之作</a>
  </div>
  <div class="post-excerpt">
    今天花了4小时精读CLIP论文，理解了对比学习如何实现视觉-语言对齐...
  </div>
  <div class="tags">
    <span class="tag">CLIP</span>
    <span class="tag">论文精读</span>
  </div>
</div>
```

### 3. 提交到GitHub

```bash
cd wanqinzhang.github.io
git add .
git commit -m "添加新文章: XXXX"
git push origin main
```

等待几分钟，GitHub Pages会自动部署。

## 技术栈

- 纯HTML+CSS+JavaScript（无框架，轻量快速）
- Markdown解析：[marked.js](https://github.com/markedjs/marked)
- localStorage数据存储
- 响应式设计（支持手机/平板/桌面）
- GitHub Pages托管（免费、稳定）

## 文件结构

```
wanqinzhang.github.io/
├── index.html              # 首页
├── manage.html             # 稿件管理页面
├── editor.html             # Markdown编辑器
├── js/
│   └── articles.js         # 文章数据管理逻辑
├── posts/                  # 已发布文章
│   ├── 2026-06-14-start-cs336.html
│   ├── 2026-06-14-new-chapter.html
│   └── ...
├── drafts/                 # 草稿文章
└── README.md              # 本文件
```

## 联系方式

- 邮箱: zhangwanqin@njust.edu.cn
- GitHub: https://github.com/wanqinzhang

---

© 2026 张琬沁