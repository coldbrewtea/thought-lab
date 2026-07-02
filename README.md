# ThoughtLab — 思想实验 · 光谱分析 · 发现自己

ThoughtLab 是一个交互式思想实验平台。用户经历一系列经典思想实验（电车难题、无知之幕、忒修斯之船等），在每个实验中做出选择，最终获得一份个性化的思想光谱报告。

## 功能

- **8 个经典思想实验**：电车难题、无知之幕、忒修斯之船、体验机器、天桥难题、定时炸弹、中文房间、离开欧梅拉斯
- **6 维思想光谱**：功利主义、自由意志、集体主义、理性主义、平等主义、人道主义
- **信仰体系匹配**：对比 8 种哲学体系，找出最接近的
- **名人相似度**：与 12 位思想家的匹配度
- **统计数据**：查看自己的历史结果和趋势

## 技术栈

React 19 + TypeScript + Vite + TailwindCSS v4

## 开发

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 构建生产版本
```

## 部署

推送到 master 分支，GitHub Actions 自动构建并部署到 GitHub Pages：

https://coldbrewtea.github.io/thought-lab/
