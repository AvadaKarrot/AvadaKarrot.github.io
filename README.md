# 张琬沁的学习与求职日记

多模态AI算法工程师 · 音乐×AI · 2026年求职中

## 博客地址

https://wanqinzhang.github.io

## 关于这个博客

这是一个简洁的个人博客，用于记录我的：
- 📚 学习进展（CS336、论文精读、LeetCode）
- 💼 面试经历（技术面试、行为面试、反思总结）
- 🎵 生活思考（音乐、职业转型、日常）

## 如何添加新文章

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

- 纯HTML+CSS（无框架，轻量快速）
- 响应式设计（支持手机/平板/桌面）
- GitHub Pages托管（免费、稳定）

## 文件结构

```
wanqinzhang.github.io/
├── index.html              # 首页
├── posts/                  # 文章目录
│   ├── 2026-06-14-start-cs336.html
│   ├── 2026-06-14-new-chapter.html
│   └── ...
└── README.md              # 本文件
```

## 联系方式

- 邮箱: zhangwanqin@njust.edu.cn
- GitHub: https://github.com/wanqinzhang

---

© 2026 张琬沁