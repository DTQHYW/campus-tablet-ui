<template>
  <div class="info-panel">
    <div class="info-grid">
      <div class="info-card">
        <div class="info-label">📅 日期</div>
        <div class="info-value">{{ store.data.系统.日期 }}</div>
      </div>
      <div class="info-card">
        <div class="info-label">🕐 时段</div>
        <div class="info-value">{{ store.data.系统.时间段 }}</div>
      </div>
      <div class="info-card">
        <div class="info-label">📍 位置</div>
        <div class="info-value">{{ store.data.系统.当前位置 }}</div>
      </div>
    </div>

    <div class="section-title">近期事件</div>
    <div class="event-list">
      <div v-for="(event, i) in store.data.近期事件" :key="i" class="event-item">
        <span class="event-bullet">•</span>
        <span class="event-text">{{ event }}</span>
      </div>
      <div v-if="!store.data.近期事件 || store.data.近期事件.length === 0" class="empty-text">
        暂无近期事件
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.info-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.info-card {
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 8px 10px;
  text-align: center;
}

.info-label {
  font-size: 10px;
  color: var(--c-text-muted);
  margin-bottom: 4px;
}

.info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-text);
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-muted);
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 4px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-item {
  display: flex;
  gap: 6px;
  font-size: 12px;
  line-height: 1.5;
}

.event-bullet {
  color: var(--c-primary);
  flex-shrink: 0;
}

.event-text {
  color: var(--c-text);
}

.empty-text {
  font-size: 11px;
  color: var(--c-text-muted);
  text-align: center;
  padding: 12px;
}

@media (max-width: 480px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
