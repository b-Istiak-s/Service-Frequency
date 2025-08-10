import { ref } from "vue";
import ScheduleConfigEditor from "./components/ScheduleConfigEditor.vue";
/*
  This is the JSON string the controller would pass in.
  If you leave it null or empty, the component will default to Fortnightly.
  Replace with the controller value when wiring up.
*/
const controllerScheduleConfig = ref(null);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "cardHolder" },
});
/** @type {[typeof ScheduleConfigEditor, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ScheduleConfigEditor, new ScheduleConfigEditor({
    scheduleConfig: (__VLS_ctx.controllerScheduleConfig),
}));
const __VLS_1 = __VLS_0({
    scheduleConfig: (__VLS_ctx.controllerScheduleConfig),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
// @ts-ignore
[controllerScheduleConfig,];
/** @type {__VLS_StyleScopedClasses['cardHolder']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ScheduleConfigEditor: ScheduleConfigEditor,
            controllerScheduleConfig: controllerScheduleConfig,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map