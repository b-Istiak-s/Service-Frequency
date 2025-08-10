<template>
  <div class="w-full lg:w-96">
    <Card class="shadow-lg overflow-hidden h-full rounded-[2rem] flex flex-col">
      <CardHeader
        class="bg-gray-50 border-b w-full px-6 py-4 flex justify-center rounded-t-[2rem]"
      >
        <CardTitle class="text-lg font-semibold text-gray-800 text-center">
          Updated JSON
        </CardTitle>
      </CardHeader>
      <CardContent
        class="p-0 flex-grow rounded-b-[2rem] overflow-hidden flex flex-col"
      >
        <div
          class="overflow-auto bg-gray-900 text-gray-100 text-sm font-mono rounded-b-[2rem] flex-grow"
        >
          <pre class="p-4 whitespace-pre-wrap" v-html="formattedJson"></pre>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ value: string }>();

// Simple JSON syntax highlighting
const formattedJson = computed(() => {
  try {
    const jsonObj = JSON.parse(props.value);
    const jsonString = JSON.stringify(jsonObj, null, 2);
    return jsonString
      .replace(/(&)/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|\b\d+(\.\d+)?\b)/g,
        (match) => {
          let cls = "text-green-400"; // default for strings
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "text-yellow-300"; // keys
            }
          } else if (/true|false/.test(match)) {
            cls = "text-blue-400"; // booleans
          } else if (/null/.test(match)) {
            cls = "text-gray-400"; // null
          } else {
            cls = "text-purple-400"; // numbers
          }
          return `<span class="${cls}">${match}</span>`;
        }
      );
  } catch {
    return `<span class="text-red-400">Invalid JSON</span>`;
  }
});
</script>
