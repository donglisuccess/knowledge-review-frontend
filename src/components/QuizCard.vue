<script setup lang="ts">
import { computed } from 'vue'
import type { Question } from '../types/quiz'
import { optionKey, sameAnswer } from '../utils/quiz'

const props = defineProps<{
  question: Question
  index: number
  total: number
  selected: number[]
  submitted: boolean
}>()

const emit = defineEmits<{
  select: [index: number]
  submit: []
  next: []
}>()

const isMultiple = computed(() => props.question.type === 'multiple')
const isLast = computed(() => props.index === props.total - 1)
const isAnswerCorrect = computed(() => sameAnswer(props.selected, props.question.answer))

const typeLabel = computed(() => {
  switch (props.question.type) {
    case 'single':
      return '单选题'
    case 'multiple':
      return '多选题'
    case 'judge':
      return '判断题'
  }
})

const hintText = computed(() => {
  if (props.submitted) return ''
  return isMultiple.value ? '该题为多选题，可选择多个答案' : '选择答案后点击「提交答案」'
})

type OptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dimmed'

/** 根据是否已提交、是否为正确答案/用户选择，计算选项的展示状态 */
function optionState(index: number): OptionState {
  const isAnswer = props.question.answer.includes(index)
  const isSelected = props.selected.includes(index)
  if (!props.submitted) {
    return isSelected ? 'selected' : 'idle'
  }
  if (isAnswer) return 'correct'
  if (isSelected) return 'wrong'
  return 'dimmed'
}
</script>

<template>
  <section class="card quiz-card">
    <div class="quiz-meta">
      <span class="badge type">{{ typeLabel }}</span>
      <span class="badge category">{{ question.category }}</span>
      <span class="quiz-index">第 {{ index + 1 }} / {{ total }} 题</span>
    </div>

    <h2 class="quiz-text">{{ question.text }}</h2>

    <ul class="options">
      <li v-for="(option, i) in question.options" :key="i">
        <button
          class="option"
          :class="optionState(i)"
          :disabled="submitted"
          @click="emit('select', i)"
        >
          <span class="option-key">{{ optionKey(i) }}</span>
          <span class="option-text">{{ option }}</span>
          <span v-if="optionState(i) === 'correct'" class="option-mark correct">✔</span>
          <span v-else-if="optionState(i) === 'wrong'" class="option-mark wrong">✘</span>
        </button>
      </li>
    </ul>

    <p v-if="submitted" class="explanation" :class="isAnswerCorrect ? 'ok' : 'bad'">
      <strong>{{ isAnswerCorrect ? '回答正确！' : '回答错误。' }}</strong>
      {{ question.explanation }}
    </p>

    <div class="quiz-actions">
      <p class="hint">{{ hintText }}</p>
      <button
        v-if="!submitted"
        class="btn primary"
        :disabled="selected.length === 0"
        @click="emit('submit')"
      >
        提交答案
      </button>
      <button v-else class="btn primary" @click="emit('next')">
        {{ isLast ? '查看成绩' : '下一题 →' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.quiz-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.badge {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
}

.badge.type {
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-weight: 600;
}

.badge.category {
  color: var(--color-text-secondary);
  background: #f3f4f6;
}

.quiz-index {
  margin-left: auto;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.quiz-text {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.options {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  color: var(--color-text);
  transition: border-color 0.15s ease, background-color 0.15s ease, opacity 0.15s ease;
}

.option:hover:not(:disabled) {
  border-color: var(--color-primary);
}

.option.selected {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
}

.option.correct {
  border-color: var(--color-correct);
  background: var(--color-correct-soft);
}

.option.wrong {
  border-color: var(--color-wrong);
  background: var(--color-wrong-soft);
}

.option.dimmed {
  opacity: 0.55;
}

.option:disabled {
  cursor: default;
}

.option-key {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #f3f4f6;
  font-size: 13px;
  font-weight: 600;
}

.option.selected .option-key {
  background: var(--color-primary);
  color: #fff;
}

.option.correct .option-key {
  background: var(--color-correct);
  color: #fff;
}

.option.wrong .option-key {
  background: var(--color-wrong);
  color: #fff;
}

.option-mark {
  margin-left: auto;
  font-size: 15px;
  font-weight: 700;
}

.option-mark.correct {
  color: var(--color-correct);
}

.option-mark.wrong {
  color: var(--color-wrong);
}

.explanation {
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 20px;
}

.explanation.ok {
  background: var(--color-correct-soft);
  color: #166534;
}

.explanation.bad {
  background: var(--color-wrong-soft);
  color: #991b1b;
}

.quiz-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.hint {
  font-size: 13px;
  color: var(--color-text-secondary);
}
</style>
