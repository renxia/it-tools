<!-- // 在线文本去重工具 -->

<script setup lang="ts">
import { ref } from 'vue';
import FormatTransformer from '@/components/FormatTransformer.vue';

const inputText = ref('');
const outputText = ref('');
const ftRef = ref<typeof FormatTransformer>();

// 模式选项
const modeOptions = [
  { label: '去除所有重复行', value: 'removeAll' },
  { label: '去除连续重复行', value: 'removeConsecutive' },
];
const selectedMode = ref(modeOptions[0].value);

// 分隔符选项
const inputSeparator = ref('\n');
const outputSeparator = ref('\n');

// 行首位空白处理选项
const lineTrimOptions = [
  { label: '去除', value: 'trim' },
  { label: '保留', value: 'keep' },
];
const lineTrimHandling = ref('trim');

// 空行处理选项
const emptyLineOptions = [
  { label: '删除', value: 'remove' },
  // { label: '去重', value: 'deduplicate' },
  { label: '保留', value: 'keep' },
];
const emptyLineHandling = ref('remove');

// 排序选项
const sortOptions = [
  { label: '不排序', value: 'noSort' },
  { label: '升序', value: 'asc' },
  { label: '降序', value: 'desc' },
];
const sortOption = ref('noSort');

// 处理文本去重
function processText(text: string) {
  if (!text) {
    outputText.value = '';
    return '';
  }

  // 分割文本
  let lines = text.split(inputSeparator.value);

  // 处理行首行尾空白
  if (lineTrimHandling.value === 'trim') {
    lines = lines.map(line => line.trim());
  }

  // 处理空行
  if (emptyLineHandling.value === 'remove') {
    lines = lines.filter(line => line.trim() !== '');
  }

  // 去重处理
  let uniqueLines: string[] = [];
  if (selectedMode.value === 'removeAll') {
    // 去除所有重复行
    const seen = new Set<string>();
    uniqueLines = lines.filter((line) => {
      if (seen.has(line)) {
        return false;
      }
      seen.add(line);
      return true;
    });
  }
  else if (selectedMode.value === 'removeConsecutive') {
    // 去除连续重复行
    uniqueLines = lines.filter((line, index) => index === 0 || line !== lines[index - 1]);
  }

  // 排序
  if (sortOption.value === 'asc') {
    uniqueLines.sort();
  }
  else if (sortOption.value === 'desc') {
    uniqueLines.sort().reverse();
  }

  // 合并结果
  outputText.value = uniqueLines.join(outputSeparator.value);
  return outputText.value;
};

function downloadResult() {
  const blob = new Blob([outputText.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '文本去重结果.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function handleFileUpload(file: File) {
  if (ftRef?.value) {
    ftRef.value!.input = await file.text();
  }
}
</script>

<template>
  <c-card w-full important:flex-1 important:pa-0>
    <div class="h-full flex flex-col p-4">
      <FormatTransformer
        ref="ftRef"
        output-language="txt"
        :input-default="inputText"
        :transformer="processText"
      />

      <!-- 选项区域 -->
      <div class="grid mt-4 gap-4 lg:grid-cols-2">
        <div class="flex items-center">
          <span class="mr-2 w-24 text-right">模式:</span>
          <c-select
            v-model:value="selectedMode"
            :options="modeOptions"
            class="flex-1"
          />
        </div>

        <div class="flex items-center">
          <span class="mr-2 w-24 text-right">输入分隔符:</span>
          <c-input-text
            v-model:value="inputSeparator"
            placeholder="\n"
            class="flex-1"
          />
        </div>

        <div class="flex items-center">
          <span class="mr-2 w-24 text-right">结果分隔符:</span>
          <c-input-text
            v-model:value="outputSeparator"
            placeholder="\n"
            class="flex-1"
          />
        </div>

        <div class="flex items-center">
          <span class="mr-2 w-24 text-right">空行处理:</span>
          <c-select
            v-model:value="emptyLineHandling"
            :options="emptyLineOptions"
            class="flex-1"
          />
        </div>

        <div class="flex items-center">
          <span class="mr-2 w-24 text-right">行首行尾空白:</span>
          <c-select
            v-model:value="lineTrimHandling"
            :options="lineTrimOptions"
            class="flex-1"
          />
        </div>

        <div class="flex items-center">
          <span class="mr-2 w-24 text-right">排序:</span>
          <c-select
            v-model:value="sortOption"
            :options="sortOptions"
            class="flex-1"
          />
        </div>
      </div>

      <!-- 按钮区域 -->
      <div class="mt-4 flex justify-start space-x-2">
        <c-button :disabled="!outputText" @click="downloadResult">
          {{ $t('comm.download') }}
        </c-button>
        <c-file-upload
          accept="text/*"
          ui="btn"
          @file-upload="handleFileUpload"
        />
      </div>
    </div>
  </c-card>
</template>
