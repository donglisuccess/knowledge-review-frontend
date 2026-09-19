/** 比较两个答案下标数组是否一致（忽略顺序，用于多选题判分） */
export function sameAnswer(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort((x, y) => x - y)
  const sortedB = [...b].sort((x, y) => x - y)
  return sortedA.every((value, i) => value === sortedB[i])
}

/** 选项下标转字母编号：0 -> A、1 -> B … */
export function optionKey(index: number): string {
  return String.fromCharCode(65 + index)
}
