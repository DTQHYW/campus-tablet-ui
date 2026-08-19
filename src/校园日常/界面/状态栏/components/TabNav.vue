<template>
  <nav class="tabs">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      class="tab-button"
      :class="{ active: model === tab.id }"
      :aria-expanded="model === tab.id"
      @click="toggleTab(tab.id)"
    >
      <span class="tab-icon">{{ tabIcon(tab.id) }}</span>
      <span class="tab-label">{{ tab.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: { id: string; label: string }[];
}>();

const model = defineModel<string | null>({ required: true });

function toggleTab(id: string) {
  model.value = model.value === id ? null : id;
}

function tabIcon(id: string): string {
  const icons: Record<string, string> = {
    信息: 'ℹ️',
    角色: '👤',
    地图: '🗺️',
    便签: '📝',
    行动: '⚡',
  };
  return icons[id] || '•';
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background: var(--c-tab-bg);
  border-bottom: 1px solid var(--c-border);
}

.tab-button {
  flex: 1;
  padding: 9px 4px;
  border: none;
  background: transparent;
  color: var(--c-text-muted);
  font-size: 12px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border-right: 1px solid var(--c-border);
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  background: var(--c-surface-elevated);
  color: var(--c-primary);
}

.tab-button.active {
  background: var(--c-surface-elevated);
  color: var(--c-tab-active);
  font-weight: 600;
  position: relative;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--c-tab-active);
}

.tab-icon {
  font-size: 14px;
}

.tab-label {
  font-size: 11px;
}
</style>
