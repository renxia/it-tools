import type { Tool } from '@/tools/tools.types';

/** load js or css file from remote url */
export async function loadJsOrCss(urls: string[] = []) {
  if (typeof urls == 'string') {
    urls = [urls];
  }

  const list = [];
  for (const url of urls) {
    const isCss = url.includes('.css');
    const isLoaded = document.querySelector(isCss ? `link[href="${url}"]` : `script[src="${url}"]`);

    if (isLoaded) {
      continue;
    }

    const el = document.createElement(isCss ? 'link' : 'script');

    if (isCss) {
      (el as HTMLLinkElement).rel = 'stylesheet';
      (el as HTMLLinkElement).href = url;
    } else {
      (el as HTMLScriptElement).src = url;
      el.type = 'text/javascript';
    }

    list.push(
      new Promise<void>(resolve => {
        el.onload = () => resolve();
        setTimeout(() => resolve(), 10_000);
        document.querySelector('head')!.append(el);
      })
    );
  }

  return Promise.allSettled(list);
}

export function getRouteInfo(r: ReturnType<typeof useRoute>) {
  return {
    config: (r.meta as unknown as Tool).config || {},
    path: r.path.replace(/^\//, ''),
  };
}
