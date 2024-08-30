export {}

declare global {
  const h5Utils: {
    isDev: boolean;
    initTwikoo(cfg?: Record<string, any>): void;
    loadJsOrCss(urls: string | string[], options?: Record<string, any>): Promise<any[]>;
    initBDTJ(id: string): void;
    copy(msg: any): boolean;
    saveAs(href: string | Blob, filename?: string, toBlob?: Record<string, any>): { message?: string };
    tryToHttps(hostname?: string): boolean;
    getUrlParams(search?: string): Record<string, string>;
    alert(msg: any, p?: any): Promise<any>;
    toast(msg: any, p?: any): Promise<any>;
  };
}
