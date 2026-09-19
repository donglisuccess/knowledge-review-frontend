# knowledge-review-frontend

基于 **Vue 3 + TypeScript + Vite** 的知识复习答题应用。

## 功能

- 三种题型：单选题、多选题、判断题
- 答题即时反馈：提交后立即显示对错与答案解析
- 答题进度条，线性推进不可回退
- 成绩页：答对题数、正确率、评价语
- 错题回顾：展示每道错题的你的答案 / 正确答案 / 解析
- 一键重新开始练习

## 目录结构

```
src/
├── components/
│   ├── ProgressBar.vue   # 进度条
│   ├── QuizCard.vue      # 答题卡片（题目 + 选项 + 解析）
│   └── ResultPanel.vue   # 成绩与错题回顾
├── composables/
│   └── useQuiz.ts        # 答题状态与流程逻辑
├── data/
│   └── questions.ts      # 题库（示例数据）
├── types/
│   └── quiz.ts           # 题目 / 作答记录类型定义
├── utils/
│   └── quiz.ts           # 判分等工具函数
├── App.vue               # 页面骨架与流程切换
└── main.ts
```

## 使用

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器
npm run build    # 类型检查 + 生产构建
npm run preview  # 预览构建产物
```

## 扩展

- 新增题目：编辑 `src/data/questions.ts`，按 `Question` 类型添加即可
- 对接接口：`useQuiz(questionList)` 支持传入自定义题目列表，替换掉默认题库
