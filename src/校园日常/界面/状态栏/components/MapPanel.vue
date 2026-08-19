<template>
  <div class="map-panel">
    <div class="map-grid">
      <div
        v-for="loc in locations"
        :key="loc.name"
        class="map-card"
        :class="{ current: isCurrent(loc.name) }"
        @click="selectLocation(loc.name)"
      >
        <div class="map-icon">{{ loc.icon }}</div>
        <div class="map-name">{{ loc.name }}</div>
        <div v-if="isCurrent(loc.name)" class="map-current-mark">●</div>
      </div>
    </div>
    <div class="map-hint">当前位于：<span class="current-loc">{{ store.data.系统.当前位置 }}</span></div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const locations = [
  { name: '教室', icon: '🏫' },
  { name: '医务室', icon: '🏥' },
  { name: '走廊', icon: '🚪' },
  { name: '操场', icon: '🏟️' },
  { name: '食堂', icon: '🍚' },
  { name: '小卖部', icon: '🛒' },
  { name: '图书馆', icon: '📚' },
  { name: '校门口', icon: '🚶' },
];

function isCurrent(name: string): boolean {
  return store.data.系统.当前位置 === name;
}

function selectLocation(name: string) {
  // 仅展示，不自动修改变量。玩家通过剧情移动。
  toastr.info(`${name}：通过剧情推进前往`);
}
</script>

<style lang="scss" scoped>
.map-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.map-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.map-card {
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 12px 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.map-card:hover {
  border-color: var(--c-primary);
  background: var(--c-primary-light);
}

.map-card.current {
  border-color: var(--c-primary);
  background: var(--c-primary-light);
  border-width: 2px;
}

.map-icon {
  font-size: 22px;
  margin-bottom: 4px;
}

.map-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text);
}

.map-current-mark {
  position: absolute;
  top: 4px;
  right: 6px;
  color: var(--c-primary);
  font-size: 10px;
}

.map-hint {
  font-size: 11px;
  color: var(--c-text-muted);
  text-align: center;
  padding: 6px;
  background: var(--c-surface-muted);
  border-radius: 6px;
}

.current-loc {
  color: var(--c-primary);
  font-weight: 600;
}

@media (max-width: 480px) {
  .map-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
