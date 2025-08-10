<template>
  <div class="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
    <ScheduleForm
      :initial-config="scheduleConfig"
      @update:config="updateConfig"
    />
    <JsonPreview :value="outputJson" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import ScheduleForm from "./ScheduleForm.vue";
import JsonPreview from "./JsonPreview.vue";

interface ScheduleConfig {
  frequency: string;
  custom?: {
    days?: string[];
    timeWindows?: { start: string; end: string }[];
    exactTime?: string;
  };
}

const props = defineProps<{
  scheduleConfig?: string | null;
}>();

const currentConfig: Ref<ScheduleConfig> = ref({ frequency: "fortnightly" });

function updateConfig(newConfig: ScheduleConfig) {
  currentConfig.value = newConfig;
}

const outputJson: ComputedRef<string> = computed(() =>
  JSON.stringify(currentConfig.value, null, 2)
);
</script>
