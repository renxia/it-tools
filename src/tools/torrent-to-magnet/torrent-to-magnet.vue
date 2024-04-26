<script setup lang="ts">
import type { Ref } from 'vue';
import { useCopy } from '@/composable/copy';
import { loadJsOrCss } from '@/utils/comm';

const { t } = useI18n();
const fileInput = ref() as Ref<string>;
const { copy: CopyResult } = useCopy({ source: fileInput.value, text: t('comm.copyed') });

async function onUpload(files: File[]) {
  await loadJsOrCss(['https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/webtorrent/1.8.3/webtorrent.min.js']);

  // @ts-expect-error global var
  if (files.length && globalThis.WebTorrent) {
    // @ts-expect-error global var
    const client = new WebTorrent();
    const magnetURIs: string[] = [];

    client.on('error', (err: Error) => {
      console.error('WebTorrent error:', err);
    });

    client.on('torrent', (torrent: any) => {
      magnetURIs.push(torrent.magnetURI);
      fileInput.value = magnetURIs.join('\n');
    });

    for (let i = 0; i < files.length; i++) {
      client.add(files[i]);
    }
  }
}
</script>

<template>
  <div>
    <c-card>
      <c-file-upload title="Drag and drop a file here, or click to select a file" multiple accept=".torrent" @files-upload="onUpload" />
      <c-input-text :value="fileInput" multiline readonly :placeholder="t('tools.torrent-to-magnet.title')" rows="5" my-2 />

      <div flex justify-center>
        <c-button @click="CopyResult()">
          {{ t('comm.copy') }}
        </c-button>
      </div>
    </c-card>
  </div>
</template>

<style lang="less" scoped>
::v-deep(.n-upload-trigger) {
  width: 100%;
}
</style>
