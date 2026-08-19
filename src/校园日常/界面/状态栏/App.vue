<template>
  <div class="tablet">
    <div class="tablet-header">
      <div class="tablet-title">
        <span class="title-icon">📱</span>
        <span class="title-text">校园平板</span>
      </div>
      <div class="tablet-time">{{ store.data.系统.日期 }} · {{ store.data.系统.时间段 }}</div>
    </div>

    <TabNav v-model="active_tab" :tabs="tabs" />

    <div class="tablet-body">
      <div v-if="active_tab === '信息'" class="tab-pane">
        <InfoPanel />
      </div>
      <div v-else-if="active_tab === '角色'" class="tab-pane">
        <CharacterPanel />
      </div>
      <div v-else-if="active_tab === '地图'" class="tab-pane">
        <MapPanel />
      </div>
      <div v-else-if="active_tab === '便签'" class="tab-pane">
        <NotesPanel />
      </div>
      <div v-else-if="active_tab === '行动'" class="tab-pane">
        <ActionsPanel />
      </div>
      <div v-else class="tab-pane tab-empty">
        <div class="empty-hint">点击上方标签查看内容</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabNav from './components/TabNav.vue';
import InfoPanel from './components/InfoPanel.vue';
import CharacterPanel from './components/CharacterPanel.vue';
import MapPanel from './components/MapPanel.vue';
import NotesPanel from './components/NotesPanel.vue';
import ActionsPanel from './components/ActionsPanel.vue';
import { useDataStore } from './store';

const store = useDataStore();

const tabs = [
  { id: '信息', label: '信息' },
  { id: '角色', label: '角色' },
  { id: '地图', label: '地图' },
  { id: '便签', label: '便签' },
  { id: '行动', label: '行动' },
];

const active_tab = useLocalStorage<string | null>('campus_tablet:active_tab', null);
</script>

<style lang="scss" scoped>
.tablet {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  background: var(--c-surface);
  border: 1px solid var(--c-border-strong);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-size: 13px;
}

.tablet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--c-primary);
  color: var(--c-text-inverse);
}

.tablet-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 14px;
}

.title-icon {
  font-size: 15px;
}

.tablet-time {
  font-size: 11px;
  opacity: 0.9;
  font-family: var(--font-mono);
}

.tablet-body {
  padding: 12px;
  min-height: 200px;
  max-height: 560px;
  overflow-y: auto;
}

.tab-pane {
  animation: fade-in 0.2s ease;
}

.tab-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}

.empty-hint {
  color: var(--c-text-muted);
  font-size: 12px;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
