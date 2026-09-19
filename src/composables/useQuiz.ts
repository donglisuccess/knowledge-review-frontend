import { computed, ref } from 'vue'
import type { AnswerRecord, Question } from '../types/quiz'
import { sameAnswer } from '../utils/quiz'
import { questions as defaultQuestions } from '../data/questions'

export type QuizStatus = 'idle' | 'running' | 'finished'

export function useQuiz(questionList: Question[] = defaultQuestions) {
  const status = ref<QuizStatus>('idle')
  const currentIndex = ref(0)
  /** 当前题已选中的选项下标（多选题可累积多个） */
  const selected = ref<number[]>([])
  /** 当前题是否已提交答案 */
  const submitted = ref(false)
  /** 作答记录，按答题顺序追加 */
  const records = ref<AnswerRecord[]>([])

  const total = computed(() => questionList.length)
  const currentQuestion = computed(() => questionList[currentIndex.value]!)
  const isMultiple = computed(() => currentQuestion.value.type === 'multiple')
  const isLast = computed(() => currentIndex.value === total.value - 1)
  const progress = computed(() =>
    total.value === 0
      ? 0
      : Math.round(((currentIndex.value + (submitted.value ? 1 : 0)) / total.value) * 100),
  )
  const correctCount = computed(() => records.value.filter((r) => r.correct).length)

  /** 重置作答状态并开始练习 */
  function restart() {
    currentIndex.value = 0
    selected.value = []
    submitted.value = false
    records.value = []
    status.value = 'running'
  }

  /** 点选选项：单选/判断直接覆盖，多选切换选中态 */
  function selectOption(index: number) {
    if (submitted.value) return
    if (isMultiple.value) {
      selected.value = selected.value.includes(index)
        ? selected.value.filter((i) => i !== index)
        : [...selected.value, index]
    } else {
      selected.value = [index]
    }
  }

  /** 提交当前题答案并记入作答记录 */
  function submitAnswer() {
    const question = currentQuestion.value
    if (submitted.value || selected.value.length === 0) return
    records.value = [
      ...records.value,
      {
        questionId: question.id,
        selected: [...selected.value],
        correct: sameAnswer(selected.value, question.answer),
      },
    ]
    submitted.value = true
  }

  /** 进入下一题；最后一题则结束本次练习 */
  function next() {
    if (!submitted.value) return
    if (isLast.value) {
      status.value = 'finished'
    } else {
      currentIndex.value += 1
      selected.value = []
      submitted.value = false
    }
  }

  return {
    status,
    currentIndex,
    total,
    selected,
    submitted,
    records,
    currentQuestion,
    isMultiple,
    isLast,
    progress,
    correctCount,
    restart,
    selectOption,
    submitAnswer,
    next,
  }
}
