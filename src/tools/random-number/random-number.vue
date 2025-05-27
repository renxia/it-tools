<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NInput, NRadio, NRadioGroup, useMessage } from 'naive-ui';

// Assuming c-select, c-input-text, c-input-number, c-button are custom components from the project
// If not, they might need to be replaced with their naive-ui equivalents (e.g., NSelect, NInput, NInputNumber)

// Reactive state
const numberType = ref<'integer' | 'float'>('integer');
const isUnique = ref<boolean>(true);
const sortOrder = ref<'none' | 'asc' | 'desc'>('none'); // Default 'desc' as per image
const separator = ref<string>(''); // Default to space, image shows an empty input
const quantity = ref<number>(10);
const minValue = ref<number>(0);
const maxValue = ref<number>(100);

const showAdvanced = ref<boolean>(false); // Advanced options initially visible

const generatedNumbersText = ref<string>('');

const message = useMessage();

// Options for selects/radios
const numberTypeOptions = [
  { label: '整数', value: 'integer' },
  { label: '浮点数', value: 'float' },
];

const sortOrderOptions = [
  { label: '不排序', value: 'none' },
  { label: '升序', value: 'asc' },
  { label: '降序', value: 'desc' },
];

function generateNumbers() {
  generatedNumbersText.value = '';

  if (minValue.value >= maxValue.value) {
    message.error('最小值必须小于最大值');
    return;
  }

  if (quantity.value <= 0) {
    message.error('生成数量必须大于0');
    return;
  }

  if (quantity.value > 100000) {
    message.warning('生成数量不能超过10000');
    return;
  }

  const numbersSet = new Set<number>(); // Use Set for uniqueness if isUnique is true
  const results: number[] = [];
  const range = maxValue.value - minValue.value;

  if (isUnique.value && numberType.value === 'integer' && quantity.value > (range + 1)) {
    message.error('请求的唯一整数数量超出了指定范围可生成的最大数量');
    return;
  }

  let generatedCount = 0;
  let attempts = 0;
  const maxAttempts = quantity.value * 10; // Heuristic for max attempts, especially for unique floats

  while (generatedCount < quantity.value) {
    if (attempts >= maxAttempts && isUnique.value) {
      message.warning(`尝试次数过多 (${attempts}次)，可能无法满足所有唯一性要求。已生成 ${generatedCount} 个数字。`);
      break;
    }

    let num;
    if (numberType.value === 'integer') {
      num = Math.floor(Math.random() * (maxValue.value - minValue.value + 1)) + minValue.value;
    }
    else { // float
      num = Math.random() * (maxValue.value - minValue.value) + minValue.value;
      // Consider a fixed number of decimal places for practical uniqueness of floats
      // num = parseFloat(num.toFixed(6)); // Example: 6 decimal places
    }

    attempts++;

    if (isUnique.value) {
      if (!numbersSet.has(num)) {
        numbersSet.add(num);
        results.push(num);
        generatedCount++;
      }
    }
    else {
      results.push(num);
      generatedCount++;
    }
  }

  // Sorting
  if (sortOrder.value === 'asc') {
    results.sort((a, b) => a - b);
  }
  else if (sortOrder.value === 'desc') {
    results.sort((a, b) => b - a);
  }

  const sep = separator.value !== '' ? separator.value.replaceAll('\\n', '\n') : '  ';
  generatedNumbersText.value = results.join(sep);
}

function downloadResult() {
  if (!generatedNumbersText.value) {
    message.info('请先生成随机数');
    return;
  }
  const blob = new Blob([generatedNumbersText.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `随机数结果_${new Date().getTime()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  message.success('结果已下载');
}

async function copyResult() {
  if (!generatedNumbersText.value) {
    message.info('请先生成随机数');
    return;
  }
  try {
    await navigator.clipboard.writeText(generatedNumbersText.value);
    message.success('结果已复制到剪贴板');
  }
  catch (err) {
    message.error('复制失败，您的浏览器可能不支持或权限不足');
    console.error('Failed to copy text: ', err);
  }
}
</script>

<template>
  <c-card class="h-full flex flex-col important:p-0">
    <div class="flex flex-1 flex-col p-4 space-y-4">
      <!-- Row 1: Number Type, Uniqueness, More Params -->
      <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div class="flex items-center">
          <span class="mr-2 w-24 shrink-0 text-right">数字类型:</span>
          <NRadioGroup v-model:value="numberType" name="numberTypeRadio">
            <NRadio v-for="option in numberTypeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </NRadio>
          </NRadioGroup>
        </div>

        <div class="flex items-center">
          <span class="mr-2 w-24 shrink-0 text-right">数字唯一:</span>
          <NRadioGroup v-model:value="isUnique" name="uniquenessRadio">
            <NRadio :value="true">
              唯一
            </NRadio>
            <NRadio :value="false">
              不唯一
            </NRadio>
          </NRadioGroup>
        </div>

        <div hidden>
          <NButton text @click="showAdvanced = !showAdvanced">
            更多参数
            <template #icon>
              <div class="i-mdi-chevron-down transition-transform" :class="{ 'rotate-180': showAdvanced }" />
            </template>
          </NButton>
        </div>
      </div>

      <!-- Row 2: Advanced Options (Sort, Separator) -->
      <div v-if="showAdvanced" class="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div class="min-w-[200px] flex flex-1 items-center">
          <span class="mr-2 w-24 shrink-0 text-right">排序:</span>
          <c-select v-model:value="sortOrder" :options="sortOrderOptions" class="flex-1" />
        </div>
        <div class="min-w-[200px] flex flex-1 items-center">
          <span class="mr-2 w-24 shrink-0 text-right">结果分隔符:</span>
          <c-input-text v-model:value="separator" placeholder="空格, \n等" class="flex-1" />
        </div>
      </div>

      <!-- Row 3: Inputs (Quantity, Min, Max) -->
      <div class="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
        <div class="flex items-center">
          <span class="mr-2 w-28 shrink-0 text-right">生成数量:</span>
          <c-input-text v-model:value="quantity" :min="1" class="flex-1" />
        </div>
        <div class="flex items-center">
          <span class="mr-2 w-28 shrink-0 text-right">随机数最小值:</span>
          <c-input-text v-model:value="minValue" class="flex-1" />
        </div>
        <div class="flex items-center">
          <span class="mr-2 w-28 shrink-0 text-right">随机数最大值:</span>
          <c-input-text v-model:value="maxValue" class="flex-1" />
        </div>
      </div>

      <!-- Row 4: Action Buttons -->
      <div class="flex flex-wrap gap-2">
        <c-button type="primary" @click="generateNumbers">
          生成
        </c-button>
        <c-button :disabled="!generatedNumbersText" @click="downloadResult">
          {{ $t('comm.download') }}
        </c-button>
        <c-button :disabled="!generatedNumbersText" @click="copyResult">
          {{ $t('comm.copy') }}
        </c-button>
      </div>

      <!-- Row 5: Output Area -->
      <div class="min-h-[200px] flex flex-1 flex-col">
        <span class="mb-1 block font-medium">生成结果:</span>
        <textarea-copyable
          :value="generatedNumbersText"
          :word-wrap="true"
          placeholder="生成的随机数将显示在这里"
          class="w-full flex-1"
        />
      </div>
    </div>
  </c-card>
</template>
