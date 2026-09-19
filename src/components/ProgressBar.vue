<script setup lang="ts">
defineProps<{
  /** 当前题号（从 1 开始） */
  current: number
  total: number
  /** 完成进度百分比 0-100 */
  percent: number
}>()
</script>

<template>
  <div class="progress-wrap">
    <div class="progress-info">
      <span>答题进度</span>
      <span>第 {{ current }} / {{ total }} 题</span>
    </div>
    <div
      class="progress-track"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-fill" :style="{ width: percent + '%' }" />
    </div>
  </div>
</template>

<style scoped>
.progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.progress-track {
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #7c93ff);
  border-radius: 999px;
  transition: width 0.3s ease;
}
</style>
