/** 题型：单选 / 多选 / 判断 */
export type QuestionType = 'single' | 'multiple' | 'judge'

export interface Question {
  id: number
  type: QuestionType
  /** 题目所属知识点分类，便于按模块复习 */
  category: string
  text: string
  options: string[]
  /** 正确答案的选项下标；判断题视为「正确/错误」两个选项的单选 */
  answer: number[]
  /** 答案解析 */
  explanation: string
}

/** 一道题的作答记录 */
export interface AnswerRecord {
  questionId: number
  selected: number[]
  correct: boolean
}
