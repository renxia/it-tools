<script setup lang="ts">
import _ from 'lodash';
import type { UseValidationRule } from '@/composable/validation';
import CInputText from '@/ui/c-input-text/c-input-text.vue';

const props = withDefaults(
  defineProps<{
    transformer?: (v: string) => string
    inputValidationRules?: UseValidationRule<string>[]
    inputLabel?: string
    inputPlaceholder?: string
    inputDefault?: string
    outputLabel?: string
    outputLanguage?: string
  }>(),
  {
    transformer: _.identity,
    inputValidationRules: () => [],
    inputLabel: undefined,
    inputDefault: '',
    inputPlaceholder: undefined,
    outputLabel: undefined,
    outputLanguage: '',
  },
);

const { transformer, inputValidationRules, inputLabel, outputLabel, outputLanguage, inputPlaceholder, inputDefault }
  = toRefs(props);

const inputElement = ref<typeof CInputText>();
const input = ref(inputDefault.value);
const output = computed(() => transformer.value(input.value));

// 暴露 input
defineExpose({
  input,
});
</script>

<template>
  <div class="flex flex-col lg:flex-row">
    <CInputText
      ref="inputElement"
      v-model:value="input"
      :placeholder="inputPlaceholder || $t('comm.inputPlaceholder')"
      :label="inputLabel || $t('comm.input')"
      rows="20"
      :autosize="false"
      raw-text
      multiline
      clearable
      test-id="input"
      :validation-rules="inputValidationRules"
      monospace
    />

    <div overflow-auto class="ml-1 flex-basis-100%">
      <div mb-5px>
        {{ outputLabel || $t('comm.output') }}
      </div>
      <textarea-copyable :value="output" :language="outputLanguage" :follow-height-of="inputElement?.inputWrapperRef" />
    </div>
  </div>
</template>
