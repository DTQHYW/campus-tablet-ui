<template>
  <div class="actions-panel">
    <div v-if="actions.length === 0" class="empty-text">
      暂无行动选项，等待 AI 生成
    </div>
    <div v-else class="actions-list">
      <button
        v-for="(action, i) in actions"
        :key="i"
        class="action-card"
        :class="{ sent: sentIndex === i, disabled: sentIndex !== null && sentIndex !== i }"
        :disabled="sentIndex !== null"
        @click="sendAction(i, action)"
      >
        <div class="action-index">{{ i + 1 }}</div>
        <div class="action-body">
          <div class="action-title">{{ action.标题 }}</div>
          <div class="action-desc">{{ action.描述 }}</div>
        </div>
        <div v-if="sentIndex === i" class="action-sent-mark">✓ 已发送</div>
      </button>
    </div>
    <div v-if="sentIndex !== null" class="reset-hint" @click="resetSent">
      ↻ 新回复到达后可再次选择
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

interface Action {
  标题: string;
  描述: string;
}

const actions = computed<Action[]>(() => {
  return (store.data.行动选项 || []) as unknown as Action[];
});

const sentIndex = ref<number | null>(null);

// 当行动选项变化（新回复到达）时重置已发送状态
watch(
  () => actions.value,
  () => {
    sentIndex.value = null;
  },
  { deep: true }
);

async function sendAction(index: number, action: Action) {
  if (sentIndex.value !== null) return;
  sentIndex.value = index;
  const message = `${action.标题}：${action.描述}`;
  try {
    await generate({ prompt: message, swipe: false });
  } catch (e) {
    console.error('[校园平板] 发送行动选项失败', e);
    sentIndex.value = null;
  }
}

function resetSent() {
  // 仅提示，不实际重置（需新回复到达后 watch 自动重置）
  toastr.info('新回复到达后将自动解锁选项');
}
</script>

<style lang="scss" scoped>
.actions-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-text {
  text-align: center;
  color: var(--c-text-muted);
  font-size: 12px;
  padding: 24px;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-family: var(--font-ui);
  width: 100%;
}

.action-card:hover:not(.disabled) {
  border-color: var(--c-primary);
  background: var(--c-primary-light);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(74, 144, 217, 0.15);
}

.action-card.sent {
  border-color: var(--c-success);
  background: #ecfdf5;
  cursor: default;
}

.action-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-index {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--c-primary);
  color: white;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-card.sent .action-index {
  background: var(--c-success);
}

.action-body {
  flex: 1;
}

.action-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 2px;
}

.action-desc {
  font-size: 11px;
  color: var(--c-text-muted);
  line-height: 1.5;
}

.action-sent-mark {
  font-size: 10px;
  color: var(--c-success);
  font-weight: 600;
  flex-shrink: 0;
}

.reset-hint {
  font-size: 10px;
  color: var(--c-text-muted);
  text-align: center;
  padding: 4px;
  cursor: pointer;
}

.reset-hint:hover {
  color: var(--c-primary);
}
</style>
