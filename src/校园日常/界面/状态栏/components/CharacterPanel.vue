<template>
  <div class="char-panel">
    <div v-if="involvedCharacters.length === 0" class="empty-text">
      当前场景没有角色出场
    </div>
    <div v-else class="char-list">
      <div v-for="char in involvedCharacters" :key="char.name" class="char-card" :class="statusClass(char)">
        <div class="char-header">
          <span class="char-name">{{ char.name }}</span>
          <span class="char-stage" :class="stageClass(char.关系阶段)">{{ char.关系阶段 }}</span>
        </div>
        <div class="char-status">
          <span class="status-badge" :class="conqueredClass(char.攻略状态)">{{ char.攻略状态 }}</span>
        </div>
        <div class="stat-bars">
          <StatBar label="好感" :value="char.好感度" :max="100" color="like" icon="💖" />
          <StatBar label="欲望" :value="char.欲望值" :max="100" color="desire" icon="🔥" />
          <StatBar label="亲密" :value="char.亲密度" :max="100" color="intimacy" icon="💫" />
          <StatBar label="信任" :value="char.信任度" :max="100" color="trust" icon="🤝" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';
import StatBar from './StatBar.vue';

const store = useDataStore();

interface CharData {
  好感度: number;
  欲望值: number;
  亲密度: number;
  信任度: number;
  关系阶段: string;
  攻略状态: string;
}

const involvedCharacters = computed(() => {
  const involved = store.data.当前涉及角色 || [];
  const result: { name: string } & CharData[] = [];
  for (const name of involved) {
    const charData = (store.data as any)[name] as CharData | undefined;
    if (charData) {
      result.push({ name, ...charData } as any);
    }
  }
  return result;
});

function statusClass(char: any): string {
  if (char.攻略状态 === '已攻略') return 'conquered';
  if (char.攻略状态 === '攻略中') return 'progressing';
  return 'unconquered';
}

function stageClass(stage: string): string {
  const classes: Record<string, string> = {
    初识: 'stage-init',
    熟悉: 'stage-familiar',
    暧昧: 'stage-ambiguous',
    亲密: 'stage-intimate',
  };
  return classes[stage] || 'stage-init';
}

function conqueredClass(status: string): string {
  if (status === '已攻略') return 'badge-conquered';
  if (status === '攻略中') return 'badge-progressing';
  return 'badge-unconquered';
}
</script>

<style lang="scss" scoped>
.char-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-text {
  text-align: center;
  color: var(--c-text-muted);
  font-size: 12px;
  padding: 24px;
}

.char-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.char-card {
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 10px 12px;
  border-left: 4px solid var(--c-border-strong);
}

.char-card.conquered {
  border-left-color: var(--c-bar-fill);
}

.char-card.progressing {
  border-left-color: var(--c-accent);
}

.char-card.unconquered {
  border-left-color: var(--c-border-strong);
}

.char-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.char-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--c-text);
}

.char-stage {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.stage-init {
  background: var(--c-surface-muted);
  color: var(--c-text-muted);
}

.stage-familiar {
  background: var(--c-primary-light);
  color: var(--c-primary);
}

.stage-ambiguous {
  background: var(--c-accent-light);
  color: var(--c-accent);
}

.stage-intimate {
  background: var(--c-bar-bg);
  color: var(--c-bar-fill);
}

.char-status {
  margin-bottom: 8px;
}

.status-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 8px;
}

.badge-conquered {
  background: var(--c-bar-fill);
  color: white;
}

.badge-progressing {
  background: var(--c-accent);
  color: white;
}

.badge-unconquered {
  background: var(--c-surface-muted);
  color: var(--c-text-muted);
}

.stat-bars {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
