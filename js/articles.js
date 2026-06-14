// 文章数据管理模块
const ArticleManager = {
  // 获取所有文章
  getAll() {
    const articles = localStorage.getItem('blog_articles');
    if (!articles) {
      // 初始化默认数据
      const defaultArticles = [
        {
          id: '2026-06-14-start-cs336',
          title: '开始CS336：大模型系统学习启动',
          category: '学习',
          tags: ['CS336', 'LLM', '学习计划'],
          status: 'public',
          date: '2026-06-14',
          markdown: '# 开始CS336：大模型系统学习启动\n\n今天开始系统学习斯坦福CS336课程...',
          html: '',
          createdAt: '2026-06-14T10:00:00',
          updatedAt: '2026-06-14T10:00:00'
        },
        {
          id: '2026-06-14-new-chapter',
          title: '新的开始：离开体制，追求成长',
          category: '生活',
          tags: ['职业转型', '人生规划'],
          status: 'public',
          date: '2026-06-14',
          markdown: '# 新的开始：离开体制，追求成长\n\nHR那边已经明确拒绝了...',
          html: '',
          createdAt: '2026-06-14T09:00:00',
          updatedAt: '2026-06-14T09:00:00'
        }
      ];
      this.saveAll(defaultArticles);
      return defaultArticles;
    }
    return JSON.parse(articles);
  },

  // 保存所有文章
  saveAll(articles) {
    localStorage.setItem('blog_articles', JSON.stringify(articles));
    // 备份到另一个key
    localStorage.setItem('blog_articles_backup', JSON.stringify({
      data: articles,
      timestamp: new Date().toISOString()
    }));
  },

  // 根据ID获取文章
  getById(id) {
    const articles = this.getAll();
    return articles.find(a => a.id === id);
  },

  // 创建新文章
  create(articleData) {
    const articles = this.getAll();
    const now = new Date().toISOString();

    const newArticle = {
      id: articleData.id || `${articleData.date}-${Date.now()}`,
      title: articleData.title || '无标题',
      category: articleData.category || '学习',
      tags: articleData.tags || [],
      status: articleData.status || 'private',
      date: articleData.date || new Date().toISOString().split('T')[0],
      markdown: articleData.markdown || '',
      html: articleData.html || '',
      createdAt: now,
      updatedAt: now
    };

    articles.push(newArticle);
    this.saveAll(articles);
    return newArticle;
  },

  // 更新文章
  update(id, updates) {
    const articles = this.getAll();
    const index = articles.findIndex(a => a.id === id);

    if (index === -1) return null;

    articles[index] = {
      ...articles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveAll(articles);
    return articles[index];
  },

  // 删除文章
  delete(id) {
    const articles = this.getAll();
    const filtered = articles.filter(a => a.id !== id);
    this.saveAll(filtered);
    return filtered.length < articles.length;
  },

  // 发布文章
  publish(id) {
    return this.update(id, { status: 'public' });
  },

  // 撤回文章
  unpublish(id) {
    return this.update(id, { status: 'private' });
  },

  // 筛选文章
  filter(status) {
    const articles = this.getAll();
    if (status === 'all') return articles;
    return articles.filter(a => a.status === status);
  },

  // 导出所有数据（JSON格式）
  exportJSON() {
    const articles = this.getAll();
    const dataStr = JSON.stringify(articles, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // 导入数据
  importJSON(jsonString) {
    try {
      const articles = JSON.parse(jsonString);
      if (!Array.isArray(articles)) {
        throw new Error('数据格式错误');
      }
      this.saveAll(articles);
      return true;
    } catch (e) {
      console.error('导入失败:', e);
      return false;
    }
  }
};

// Markdown转HTML工具
const MarkdownConverter = {
  // 转换Markdown为HTML
  convert(markdown) {
    if (typeof marked !== 'undefined') {
      // 使用marked.js库
      return marked.parse(markdown);
    } else {
      // 简单的fallback转换
      return this.simpleConvert(markdown);
    }
  },

  // 简单的Markdown转换（fallback）
  simpleConvert(markdown) {
    let html = markdown;

    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 粗体和斜体
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 代码块
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 引用
    html = html.replace(/^> (.+)/gim, '<blockquote>$1</blockquote>');

    // 列表
    html = html.replace(/^\* (.+)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // 段落
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    return html;
  }
};

// HTML导出工具
const HTMLExporter = {
  // 生成完整的HTML文件
  generateHTML(article) {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${article.title} - 张琬沁的博客</title>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
    line-height: 1.8;
    color: #333;
    background: #f5f7fa;
    padding: 20px;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  }

  .header {
    margin-bottom: 20px;
  }

  .back-link {
    color: #667eea;
    text-decoration: none;
    font-size: 0.9em;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .article {
    margin-top: 30px;
  }

  .article h1 {
    color: #2c3e50;
    font-size: 2em;
    margin-bottom: 15px;
  }

  .meta {
    color: #7f8c8d;
    font-size: 0.9em;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #ecf0f1;
  }

  .category {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.85em;
    margin-left: 10px;
  }

  .tags {
    margin-top: 10px;
  }

  .tag {
    display: inline-block;
    background: #e8ecf7;
    color: #667eea;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.8em;
    margin-right: 5px;
  }

  .content h2 {
    color: #34495e;
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 1.5em;
  }

  .content h3 {
    color: #34495e;
    margin-top: 25px;
    margin-bottom: 12px;
    font-size: 1.2em;
  }

  .content p {
    margin-bottom: 15px;
    text-align: justify;
  }

  .content ul, .content ol {
    margin-bottom: 15px;
    padding-left: 30px;
  }

  .content li {
    margin-bottom: 8px;
  }

  .content a {
    color: #667eea;
    text-decoration: none;
  }

  .content a:hover {
    text-decoration: underline;
  }

  .content blockquote {
    border-left: 4px solid #667eea;
    padding-left: 20px;
    margin: 20px 0;
    color: #555;
    font-style: italic;
  }

  .content code {
    background: #f4f4f4;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: "Consolas", "Monaco", monospace;
    font-size: 0.9em;
  }

  .content pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
  }

  .content pre code {
    background: none;
    padding: 0;
    color: inherit;
  }

  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }

    .article h1 {
      font-size: 1.5em;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="../index.html" class="back-link">← 返回首页</a>
    </div>

    <div class="article">
      <h1>${article.title}</h1>

      <div class="meta">
        <span>${article.date}</span>
        <span class="category">${article.category}</span>
        ${article.tags && article.tags.length > 0 ? `
        <div class="tags">
          ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        ` : ''}
      </div>

      <div class="content">
        ${article.html}
      </div>
    </div>
  </div>
</body>
</html>`;
  },

  // 导出HTML文件
  export(article) {
    const html = this.generateHTML(article);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const folder = article.status === 'public' ? 'posts' : 'drafts';
    a.download = `${article.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
    return `${folder}/${article.id}.html`;
  }
};

// Toast提示工具
const Toast = {
  show(message, type = 'success') {
    // 移除已存在的toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const styles = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-size: 0.9em;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    const bgColor = type === 'success' ? '#28a745' :
                    type === 'error' ? '#dc3545' :
                    '#667eea';

    toast.style.cssText = styles + `background: ${bgColor};`;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

// 添加动画样式
if (!document.querySelector('#toast-animations')) {
  const style = document.createElement('style');
  style.id = 'toast-animations';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
