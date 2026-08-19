<template>
  <div class="notes-panel">
    <div v-if="notes.length === 0" class="empty-text">
      暂无邀约或约定
    </div>
    <div v-else class="notes-list">
      <div v-for="(note, i) in notes" :key="i" class="note-card">
        <div class="note-header">
          <span class="note-char">{{ note.角色 }}</span>
          <span class="note-time">{{ note.时间 }}</span>
        </div>
        <div class="note-content">{{ note.内容 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

interface Note {
  角色: string;
  内容: string;
  时间: string;
}

const notes = computed<Note[]>(() => {
  return (store.data.便签 || []) as unknown as Note[];
});
</script>

<style lang="scss" scoped>
.notes-panel {
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

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note-card {
  background: #fffef5;
  border: 1px solid #f0e6c0;
  border-radius: 8px;
  padding: 10px 12px;
  border-left: 4px solid var(--c-accent);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.04);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.note-char {
  font-size: 12px;
  font-weight: 700;
  color: var(--c-accent);
}

.note-time {
  font-size: 10px;
  color: var(--c-text-muted);
  font-family: var(--font-mono);
}

.note-content {
  font-size: 12px;
  color: var(--c-text);
  line-height: 1.6;
}
</style>
