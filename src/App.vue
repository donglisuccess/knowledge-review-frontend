<script setup lang="ts">
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
</script>

<template>
  <div class="page">
    <header class="page-header">
      <h1>📚 Day Day Up</h1>
      <p class="subtitle">Vue3 / TypeScript / JavaScript / 工程化 前端知识巩固</p>
    </header>

    <main class="page-main">
      <Transition name="fade" mode="out-in">
        <section v-if="status === 'idle'" key="start" class="card start-card">
          <div class="start-icon">📚</div>
          <h2>准备好了吗？</h2>
          <p class="start-desc">
            本次练习共 {{ total }} 道题，包含单选、多选与判断题。
            每题提交后可立即查看答案与解析，完成后会生成成绩与错题回顾。
          </p>
          <button class="btn primary large" @click="restart">开始练习</button>
        </section>

        <div v-else-if="status === 'running'" key="quiz" class="quiz-area">
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

        <ResultPanel v-else key="result" :questions="questions" :records="records" @restart="restart" />
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 16px 60px;
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

.start-card {
  text-align: center;
  padding: 48px 32px;
}

.start-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.start-card h2 {
  font-size: 22px;
  margin-bottom: 12px;
}

.start-desc {
  color: var(--color-text-secondary);
  line-height: 1.8;
  max-width: 460px;
  margin: 0 auto 28px;
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
