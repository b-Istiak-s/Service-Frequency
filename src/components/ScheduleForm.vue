<template>
  <div class="flex-1">
    <Card class="shadow-lg rounded-2xl overflow-hidden">
      <CardHeader class="bg-gray-50 border-b px-6 py-5">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Service frequency
        </CardTitle>
        <CardDescription class="text-sm text-gray-500 mt-1">
          Choose how often a service visit should occur
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6 px-6 py-5">
        <!-- Frequency Options -->
        <RadioGroup v-model="selectedFrequency" class="space-y-3">
          <div
            v-for="opt in frequencies"
            :key="opt.key"
            class="flex items-center p-4 rounded-xl border transition-all cursor-pointer"
            :class="{
              'bg-blue-50 border-blue-400 shadow-sm ring-1 ring-blue-300':
                selectedFrequency === opt.key,
              'bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm':
                selectedFrequency !== opt.key,
            }"
            @click="selectedFrequency = opt.key"
          >
            <RadioGroupItem :value="opt.key" :id="opt.key" />
            <Label
              :for="opt.key"
              class="flex-1 font-medium cursor-pointer ml-3"
            >
              {{ opt.label }}
              <span
                v-if="opt.key === 'fortnightly'"
                class="ml-2 text-xs text-gray-500"
              >
                (default)
              </span>
            </Label>
          </div>
        </RadioGroup>

        <!-- Custom Configuration -->
        <transition name="fade-slide">
          <div
            v-if="selectedFrequency === 'custom'"
            class="space-y-6 p-5 bg-gray-50 rounded-xl border border-gray-200"
          >
            <!-- Days of the Week -->
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-800">Select days</h4>
              <div class="grid grid-cols-7 gap-2">
                <div
                  v-for="day in daysOfWeek"
                  :key="day"
                  class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border text-xs font-medium transition-all"
                  :class="{
                    'bg-blue-50 border-blue-400 text-blue-700 shadow-sm':
                      selectedDays.includes(day),
                    'bg-white border-gray-200 text-gray-600 hover:bg-gray-100':
                      !selectedDays.includes(day),
                  }"
                  @click="toggleDay(day)"
                >
                  {{ day.slice(0, 3) }}
                </div>
              </div>
              <p class="text-xs text-gray-500">You may pick one or many days</p>
            </div>

            <!-- Time Windows -->
            <div class="space-y-3">
              <div class="flex items-center">
                <Checkbox
                  id="specify-windows"
                  v-model="specifyTimeWindowsChecked"
                  class="mr-3"
                />
                <Label for="specify-windows" class="font-medium cursor-pointer">
                  Specify time window(s)
                </Label>
              </div>

              <transition-group
                name="fade-slide"
                tag="div"
                class="space-y-3 ml-6"
              >
                <div
                  v-for="(window, index) in timeWindows"
                  :key="index"
                  class="flex items-center gap-3"
                >
                  <Input
                    type="time"
                    v-model="window.start"
                    class="w-28 rounded-lg border-gray-300"
                  />
                  <span class="text-sm text-gray-500">to</span>
                  <Input
                    type="time"
                    v-model="window.end"
                    class="w-28 rounded-lg border-gray-300"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="ml-2"
                    @click="removeTimeWindow(index)"
                  >
                    Remove
                  </Button>
                </div>
              </transition-group>

              <div
                v-if="specifyTimeWindowsChecked"
                class="flex items-center gap-3"
              >
                <Button type="button" @click="addTimeWindow" size="sm">
                  Add window
                </Button>
                <p class="text-xs text-gray-500">
                  Example times, such as 06:30 to 07:30
                </p>
              </div>
            </div>

            <!-- Exact Time -->
            <div class="space-y-3">
              <div class="flex items-center">
                <Checkbox
                  id="exact-time"
                  v-model="setExactTimeChecked"
                  class="mr-3"
                />
                <Label for="exact-time" class="font-medium cursor-pointer">
                  Set exact time
                </Label>
              </div>

              <transition name="fade-slide">
                <div v-if="setExactTimeChecked" class="ml-6 space-y-2">
                  <Input
                    type="time"
                    v-model="exactTime"
                    class="w-28 rounded-lg border-gray-300"
                  />
                  <p class="text-xs text-gray-500">
                    Single service time, such as 13:30
                  </p>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import Input from "@/components/ui/input/Input.vue";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Label from "@/components/ui/label/Label.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group/index";
import Button from "@/components/ui/button/Button.vue";

interface TimeWindow {
  start: string;
  end: string;
}
interface CustomConfig {
  days?: string[];
  timeWindows?: TimeWindow[];
  exactTime?: string;
}
interface ScheduleConfig {
  frequency: string;
  custom?: CustomConfig;
}

const props = defineProps<{ initialConfig?: string | null }>();
const emit = defineEmits<{ "update:config": [ScheduleConfig] }>();

const frequencies = [
  { key: "weekly", label: "Weekly" },
  { key: "fortnightly", label: "Fortnightly" },
  { key: "every4weeks", label: "Every 4 weeks" },
  { key: "none", label: "None" },
  { key: "custom", label: "Custom" },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultFrequency = "fortnightly";
const selectedFrequency = ref(defaultFrequency);
const selectedDays = ref<string[]>([]);
const specifyTimeWindowsChecked = ref(false);
const timeWindows = ref<TimeWindow[]>([]);
const setExactTimeChecked = ref(false);
const exactTime = ref("");

function toggleDay(day: string) {
  const idx = selectedDays.value.indexOf(day);
  if (idx === -1) selectedDays.value.push(day);
  else selectedDays.value.splice(idx, 1);
}

function addTimeWindow() {
  timeWindows.value.push(reactive({ start: "", end: "" }));
}

function removeTimeWindow(index: number) {
  timeWindows.value.splice(index, 1);
  if (timeWindows.value.length === 0) specifyTimeWindowsChecked.value = false;
}

function emitConfig() {
  const config: ScheduleConfig = { frequency: selectedFrequency.value };
  if (selectedFrequency.value === "custom") {
    const custom: CustomConfig = {};
    if (selectedDays.value.length) custom.days = [...selectedDays.value];
    if (specifyTimeWindowsChecked.value && timeWindows.value.length) {
      const valid = timeWindows.value.filter((w) => w.start && w.end);
      if (valid.length) custom.timeWindows = valid;
    }
    if (setExactTimeChecked.value && exactTime.value) {
      custom.exactTime = exactTime.value;
    }
    if (Object.keys(custom).length) config.custom = custom;
  }
  emit("update:config", config);
}

watch(
  [
    selectedFrequency,
    selectedDays,
    timeWindows,
    exactTime,
    specifyTimeWindowsChecked,
    setExactTimeChecked,
  ],
  emitConfig,
  { deep: true }
);

onMounted(() => {
  if (!props.initialConfig) return;
  try {
    const parsed = JSON.parse(props.initialConfig);
    if (parsed.frequency) {
      selectedFrequency.value = parsed.frequency;
      if (parsed.custom) {
        if (Array.isArray(parsed.custom.days))
          selectedDays.value = parsed.custom.days;
        if (Array.isArray(parsed.custom.timeWindows)) {
          timeWindows.value = parsed.custom.timeWindows;
          specifyTimeWindowsChecked.value = timeWindows.value.length > 0;
        }
        if (parsed.custom.exactTime) {
          exactTime.value = parsed.custom.exactTime;
          setExactTimeChecked.value = true;
        }
      }
    }
  } catch {}
});
</script>
