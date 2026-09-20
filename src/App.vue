<script setup lang="ts">
import { computed } from 'vue'
import { useQuiz } from './composables/useQuiz'
import { questions } from './data/questions'
import ProgressBar from './components/ProgressBar.vue'
import QuizCard from './components/QuizCard.vue'
import ResultPanel from './components/ResultPanel.vue'

const {
  status,
  currentIndex,
  total,
  selected,
  submitted,
  records,
  currentQuestion,
  progress,
  restart,
  selectOption,
  submitAnswer,
  next,
} = useQuiz()

/** 首页展示的知识分类（去重） */
const categories = computed(() => [...new Set(questions.map((q) => q.category))])
/** 题型数量（去重） */
const typeCount = computed(() => new Set(questions.map((q) => q.type)).size)

/** 各知识分类的标签配色 */
const categoryColors: Record<string, { bg: string; color: string }> = {
  Vue3: { bg: '#ecfdf5', color: '#059669' },
  TypeScript: { bg: '#eff6ff', color: '#2563eb' },
  JavaScript: { bg: '#fffbeb', color: '#d97706' },
  工程化: { bg: '#f5f3ff', color: '#7c3aed' },
}

function categoryStyle(name: string) {
  const c = categoryColors[name] ?? { bg: '#f3f4f6', color: '#6b7280' }
  return { background: c.bg, color: c.color }
}
</script>

<template>
  <div class="page">
    <!-- 首页背景装饰：浮动光斑 + 网格纹理 -->
    <div v-if="status === 'idle'" class="hero-bg" aria-hidden="true">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
      <div class="hero-grid" />
    </div>

    <Transition name="fade" mode="out-in">
      <!-- ============ 首页 Hero ============ -->
      <section v-if="status === 'idle'" key="start" class="hero">
        <span class="hero-badge">✨ 前端知识巩固计划</span>

        <h1 class="hero-title">
          知识复习<br />
          <span class="grad">每日一练</span>
        </h1>

        <p class="hero-desc">
          精选前端核心知识点，每题提交后即时查看答案解析，
          完成练习后生成专属成绩报告，助你精准查漏补缺。
        </p>

        <div class="hero-stats">
          <div class="stat">
            <strong>{{ total }}</strong>
            <span>道精选题</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <strong>{{ typeCount }}</strong>
            <span>种题型</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <strong>{{ categories.length }}</strong>
            <span>个知识分类</span>
          </div>
        </div>

        <button class="cta" @click="restart">
          开始练习
          <span class="cta-arrow">→</span>
        </button>

        <div class="hero-tags">
          <span
            v-for="c in categories"
            :key="c"
            class="hero-tag"
            :style="categoryStyle(c)"
          >
            {{ c }}
          </span>
        </div>

        <div class="features">
          <div class="feature">
            <span class="feature-icon">⚡</span>
            <h3>即时解析</h3>
            <p>提交即看答案与讲解</p>
          </div>
          <div class="feature">
            <span class="feature-icon">📊</span>
            <h3>成绩报告</h3>
            <p>正确率一目了然</p>
          </div>
          <div class="feature">
            <span class="feature-icon">🔁</span>
            <h3>错题回顾</h3>
            <p>针对性查漏补缺</p>
          </div>
        </div>
      </section>

      <!-- ============ 答题 / 成绩 ============ -->
      <div v-else key="app" class="app-area">
        <header class="page-header">
          <h1>📚 知识复习 · 每日一练</h1>
          <p class="subtitle">Vue3 / TypeScript / JavaScript / 工程化 前端知识巩固</p>
        </header>

        <main>
          <Transition name="fade" mode="out-in">
            <div v-if="status === 'running'" key="quiz" class="quiz-area">
              <ProgressBar :current="currentIndex + 1" :total="total" :percent="progress" />
              <QuizCard
                :question="currentQuestion"
                :index="currentIndex"
                :total="total"
                :selected="selected"
                :submitted="submitted"
                @select="selectOption"
                @submit="submitAnswer"
                @next="next"
              />
            </div>

            <ResultPanel
              v-else
              key="result"
              :questions="questions"
              :records="records"
              @restart="restart"
            />
          </Transition>
        </main>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 16px 60px;
}

/* ================= 首页背景装饰 ================= */
.hero-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
}

.orb-1 {
  width: 420px;
  height: 420px;
  background: #818cf8;
  top: -120px;
  left: -100px;
  animation: float 9s ease-in-out infinite;
}

.orb-2 {
  width: 360px;
  height: 360px;
  background: #c084fc;
  top: 20%;
  right: -120px;
  animation: float 11s ease-in-out infinite reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: #67e8f9;
  bottom: -100px;
  left: 30%;
  animation: float 13s ease-in-out infinite;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(79, 110, 247, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 110, 247, 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 38%, #000 25%, transparent 72%);
  mask-image: radial-gradient(ellipse 70% 55% at 50% 38%, #000 25%, transparent 72%);
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(24px, -32px) scale(1.06);
  }
}

/* ================= 首页 Hero ================= */
.hero {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 44px 0 8px;
}

/* 子元素依次上浮入场 */
.hero > * {
  animation: rise 0.55s cubic-bezier(0.22, 0.9, 0.35, 1) backwards;
}

.hero > *:nth-child(1) { animation-delay: 0.05s; }
.hero > *:nth-child(2) { animation-delay: 0.12s; }
.hero > *:nth-child(3) { animation-delay: 0.2s; }
.hero > *:nth-child(4) { animation-delay: 0.28s; }
.hero > *:nth-child(5) { animation-delay: 0.36s; }
.hero > *:nth-child(6) { animation-delay: 0.44s; }
.hero > *:nth-child(7) { animation-delay: 0.52s; }

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  background: rgba(238, 242, 255, 0.9);
  border: 1px solid rgba(79, 110, 247, 0.25);
  box-shadow: 0 4px 14px rgba(79, 110, 247, 0.12);
}

.hero-title {
  font-size: clamp(36px, 7vw, 54px);
  font-weight: 800;
  line-height: 1.22;
  letter-spacing: 1px;
  margin: 20px 0 16px;
}

.grad {
  background: linear-gradient(120deg, #4f6ef7 10%, #9333ea 55%, #db2777 95%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-desc {
  color: var(--color-text-secondary);
  line-height: 1.9;
  max-width: 520px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 28px 0 30px;
}

.stat strong {
  display: block;
  font-size: 30px;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.2;
}

.stat span {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--color-border);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  padding: 16px 46px;
  border-radius: 999px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #fff;
  background: linear-gradient(135deg, #4f6ef7 0%, #7c3aed 100%);
  box-shadow: 0 12px 28px rgba(99, 91, 255, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(99, 91, 255, 0.46), inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.cta:active {
  transform: translateY(0) scale(0.98);
}

.cta:focus-visible {
  outline: 3px solid rgba(79, 110, 247, 0.4);
  outline-offset: 3px;
}

.cta-arrow {
  display: inline-block;
  transition: transform 0.18s ease;
}

.cta:hover .cta-arrow {
  transform: translateX(5px);
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 26px;
}

.hero-tag {
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 999px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
  width: 100%;
  max-width: 620px;
  margin-top: 44px;
}

.feature {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 14px;
  padding: 18px 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow);
}

.feature-icon {
  font-size: 26px;
}

.feature h3 {
  font-size: 14px;
  margin: 8px 0 4px;
}

.feature p {
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* ================= 答题 / 成绩页 ================= */
.app-area {
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 28px;
}

.page-header h1 {
  font-size: 26px;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.quiz-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
