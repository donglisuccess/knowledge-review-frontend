<script setup lang="ts">
import { computed } from 'vue'
import type { AnswerRecord, Question } from '../types/quiz'
import { optionKey } from '../utils/quiz'

const props = defineProps<{
  questions: Question[]
  /** 作答记录，与 questions 顺序一致 */
  records: AnswerRecord[]
}>()

const emit = defineEmits<{
  restart: []
}>()

const total = computed(() => props.questions.length)
const correctCount = computed(() => props.records.filter((r) => r.correct).length)
const accuracy = computed(() =>
  total.value === 0 ? 0 : Math.round((correctCount.value / total.value) * 100),
)

const evaluation = computed(() => {
  if (accuracy.value === 100) return '满分！知识掌握得非常牢固 🎉'
  if (accuracy.value >= 80) return '很不错，继续保持 💪'
  if (accuracy.value >= 60) return '及格了，再复习一下错题吧 📖'
  return '需要加强复习，建议重新练习一遍 🔁'
})

/** 错题列表：记录与题目按下标一一对应 */
const wrongList = computed(() =>
  props.records
    .map((record, index) => ({ record, question: props.questions[index] }))
    .filter((item): item is { record: AnswerRecord; question: Question } =>
      item.question !== undefined && !item.record.correct,
    ),
)

/** 将答案下标数组转为可读文本，如「A. ref()；B. reactive()」 */
function answerText(question: Question, indexes: number[]): string {
  return indexes.map((i) => `${optionKey(i)}. ${question.options[i]}`).join('；')
}
</script>

<template>
  <section class="card result-card">
    <h2 class="result-title">练习完成</h2>

    <div class="score-row">
      <div class="score-main">
        <div>
          <span class="score-number">{{ correctCount }}</span>
          <span class="score-suffix">/ {{ total }}</span>
        </div>
        <p class="score-label">答对题数</p>
      </div>
      <div class="score-side">
        <p class="accuracy">正确率 {{ accuracy }}%</p>
        <p class="evaluation">{{ evaluation }}</p>
      </div>
    </div>

    <div v-if="wrongList.length" class="wrong-list">
      <h3>错题回顾（{{ wrongList.length }}）</h3>
      <div v-for="item in wrongList" :key="item.question.id" class="wrong-item">
        <p class="wrong-question">{{ item.question.text }}</p>
        <p class="wrong-line your">你的答案：{{ answerText(item.question, item.record.selected) }}</p>
        <p class="wrong-line right">正确答案：{{ answerText(item.question, item.question.answer) }}</p>
        <p class="wrong-line explain">解析：{{ item.question.explanation }}</p>
      </div>
    </div>
    <p v-else class="all-right">全部答对，没有错题 🎊</p>

    <button class="btn primary large restart-btn" @click="emit('restart')">再练一次</button>
  </section>
</template>

<style scoped>
.result-title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 24px;
}

.score-row {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 24px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-primary-soft), #f8fafc);
  margin-bottom: 24px;
}

.score-main {
  text-align: center;
}

.score-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.score-suffix {
  font-size: 18px;
  color: var(--color-text-secondary);
}

.score-label {
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.score-side {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.accuracy {
  font-size: 18px;
  font-weight: 600;
}

.evaluation {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.wrong-list h3 {
  font-size: 16px;
  margin-bottom: 12px;
}

.wrong-item {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 12px;
}

.wrong-question {
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.6;
}

.wrong-line {
  font-size: 13px;
  line-height: 1.7;
}

.wrong-line.your {
  color: var(--color-wrong);
}

.wrong-line.right {
  color: var(--color-correct);
}

.wrong-line.explain {
  color: var(--color-text-secondary);
}

.all-right {
  text-align: center;
  color: var(--color-correct);
  font-size: 15px;
  margin-bottom: 24px;
}

.restart-btn {
  display: block;
  margin: 24px auto 0;
}
</style>
