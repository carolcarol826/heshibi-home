# 如何编辑 heshibi.tech 网页内容

## 总览

```
content.json   ←   你只改这一个文件
   +
template.html  ←   不动，Claude 维护
   ↓
build.js       ←   Vercel 自动跑
   ↓
dist/index.html  →  上线
```

**只要改 `content.json`，提交，30 秒后网站自动更新。**

---

## 怎么找到要改的字段

`content.json` 按页面区块分组：

| 区块 | 在 JSON 里的 key |
|---|---|
| 浏览器标签 / 搜索引擎元信息 | `site_meta` |
| 顶部导航文字 | `nav` |
| Hero 大标题区 | `hero` |
| 「为什么是我们」 | `approach` |
| 四个方向卡片 | `directions` |
| 三条原则 | `principles` |
| 「公司」+ 三张联系卡片 | `company` |
| 邮箱 / 城市 | `contact` |
| 底部 footer | `footer` |

每个字段都成对出现：

- `xxx_en` = 英文版本
- `xxx_zh` = 中文版本

举例：把 hero 大标题英文版改了，只改 `hero.title_html_en` 这一行。

---

## 实战例子

### 例 1：改 Hero 副标题中文

打开 `content.json`，找到：

```json
"hero": {
  ...
  "subtitle_html_zh": "合势必是一家面向全球的 AI 应用公司..."
  ...
}
```

把引号里的中文换掉，**别动引号和外面的逗号**。

### 例 2：改 04 号方向（企业赋能）的状态

找到 `directions.pillar_4_status`：

```json
"pillar_4_status": "open",
```

允许的值：
- `"research"` → 显示「研究中 / In Research」（橙色标签）
- `"alpha"` → 显示「私测中 / Private Alpha」（绿色标签）
- `"open"` → 显示「招募合作伙伴 / Open for Partnerships」（蓝色标签）

改完 status 后，**同时要改对应的 label 文字**：

```json
"pillar_4_status_label_en": "Open for Partnerships",
"pillar_4_status_label_zh": "招募合作伙伴",
```

### 例 3：改邮箱

```json
"contact": {
  "email": "carolyang.yyf@outlook.com",
  ...
}
```

只改一处，三张联系卡片全部自动更新。

---

## 写 JSON 的 5 条不踩坑规则

1. **字符串两边永远要有半角双引号** `"..."`，不能用中文引号 `"..."`
2. **每个字段后面要有逗号**（除非是这个对象的最后一个字段）
3. **不要删 `{` `}` `[` `]` 这些括号**，结构会断
4. **要写换行**：用 `<br>`，不要按回车键
5. **要写强调**：英文斜体用 `<em>词</em>`，加粗用 `<strong>词</strong>`

如果不确定，**改完一定预览**（见下）。

---

## 怎么预览改对没

### 方法 A：本地预览（电脑装了 Node 的话）

```powershell
cd "E:\CY资产库\Claude项目\heshibi-home"
node build.js
```

如果 JSON 写错（少逗号、多括号）会立刻报错说哪里错。
没报错说明编译通过，然后用浏览器打开 `dist/index.html` 看效果。

### 方法 B：直接 push 到 GitHub 看线上

如果接好了 GitHub 自动部署：
- GitHub 网页改 `content.json` → commit
- 1 分钟后访问 https://heshibi.tech 看
- 如果 build 失败，Vercel 会发邮件给你，且**线上网页保持上一版不变**（不会变成空白）

---

## 想加新区块 / 改设计 / 加新方向

这些**不是单纯改文字**的改动，找 Claude：

- 加第 5 个方向卡片
- 改主色（暖陶土橙换成其他色）
- 加一个 News 区块
- 加投资人 logo 墙
- 改字体
- 改首页布局

发消息：「heshibi.tech 加个 XX 区块」/ 「主色换成深绿」 即可。

---

## 紧急情况

- 改坏了，网页变成英文 placeholder（`{{xxx.yyy}}`）：去 GitHub 看上一次的版本，回滚那次提交
- 改完 build 报错，本地 + 线上都崩：告诉 Claude，5 分钟修好

---

最后更新：2026-05-23
