<script setup lang="ts">
import { ref } from "vue";
import ServiceFrequency from "./components/ServiceFrequency.vue";
import ScheduleForm from "./components/ScheduleForm.vue";
import ScheduleConfigEditor from "./components/ScheduleConfigEditor.vue";

/*
  This is the JSON string the controller would pass in.
  If you leave it null or empty, the component will default to Fortnightly.
  Replace with the controller value when wiring up.
*/
const controllerScheduleConfig = ref<string | null>(null);
</script>

<template>
  <main>
    <section class="cardHolder">
      <ScheduleConfigEditor :scheduleConfig="controllerScheduleConfig" />
    </section>
  </main>
</template>
