<template>
  <div class="stat-bar">
    <span class="bar-icon">{{ icon }}</span>
    <span class="bar-label">{{ label }}</span>
    <div class="bar-track" :class="colorClass">
      <div class="bar-fill" :style="{ width: fillPercent + '%' }"></div>
    </div>
    <span class="bar-value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: number;
  max: number;
  color: string;
  icon: string;
}>();

const fillPercent = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100));
});

const colorClass = computed(() => `track-${props.color}`);
</script>

<style lang="scss" scoped>
.stat-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.bar-icon {
  font-size: 12px;
  flex-shrink: 0;
}

.bar-label {
  color: var(--c-text-muted);
  width: 32px;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--c-surface-muted);
}

.track-like {
  background: var(--c-bar-bg);
}

.track-desire {
  background: var(--c-bar-desire-bg);
}

.track-intimacy {
  background: var(--c-bar-intimacy-bg);
}

.track-trust {
  background: var(--c-bar-trust-bg);
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.track-like .bar-fill {
  background: var(--c-bar-fill);
}

.track-desire .bar-fill {
  background: var(--c-bar-desire-fill);
}

.track-intimacy .bar-fill {
  background: var(--c-bar-intimacy-fill);
}

.track-trust .bar-fill {
  background: var(--c-bar-trust-fill);
}

.bar-value {
  width: 26px;
  text-align: right;
  font-weight: 600;
  color: var(--c-text);
  font-family: var(--font-mono);
  flex-shrink: 0;
}
</style>
