import { reactiveOmit } from "@vueuse/core";
import { Check } from "lucide-vue-next";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
const props = defineProps();
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.CheckboxRoot;
/** @type {[typeof __VLS_components.CheckboxRoot, typeof __VLS_components.CheckboxRoot, ]} */ ;
// @ts-ignore
CheckboxRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', props.class)) },
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[forwarded, cn,];
const __VLS_6 = {}.CheckboxIndicator;
/** @type {[typeof __VLS_components.CheckboxIndicator, typeof __VLS_components.CheckboxIndicator, ]} */ ;
// @ts-ignore
CheckboxIndicator;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: "flex h-full w-full items-center justify-center text-current" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "flex h-full w-full items-center justify-center text-current" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
var __VLS_11 = {};
const __VLS_13 = {}.Check;
/** @type {[typeof __VLS_components.Check, ]} */ ;
// @ts-ignore
Check;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ class: "h-4 w-4" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-current']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
// @ts-ignore
var __VLS_12 = __VLS_11;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Check: Check,
            CheckboxIndicator: CheckboxIndicator,
            CheckboxRoot: CheckboxRoot,
            cn: cn,
            forwarded: forwarded,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
    },
    __typeEmits: {},
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Checkbox.vue.js.map