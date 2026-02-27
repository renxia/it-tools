import { CreditCard, ScreenShare, VideoPlus } from '@vicons/tabler';
import { GamesSharp, MusicNoteTwotone, QrCode2Outlined } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';
import { converters } from './converters';
import { Docs } from './documents';
import { funs } from './funs';
import { games } from './games';

export { loadRemoteTools } from './fl-load-remote';

export const FLTools = [
  ...funs,
  ...Docs,
  ...games,
  ...converters,
  defineTool({
    path: '/video-spider',
    name: translate('tools.video-spider.title', [], '短视频去水印下载工具'),
    description: translate(
      'tools.video-spider.description',
      [],
      '免费的在线短视频去水印解析下载工具。已支持：抖音/皮皮虾/火山/微视/微博/绿洲/最右/轻视频/快手/全民小视频/皮皮搞笑/巴塞电影/陌陌/Before避风/开眼/Vue Vlog/小咖秀/全民K歌'
    ),
    keywords: ['短视频', '水印', '视频', '破解', '抖音视频下载'],
    component: () => import('./frame-loader.vue'),
    icon: VideoPlus,
    config: {
      remoteUrl: 'https://lzw.me/x/video_spider/',
      // hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Images',
  }),
  defineTool({
    path: '/round-image',
    name: translate('tools.round-image.title', [], '在线生成圆角照片'),
    description: translate('tools.round-image.description', [], '一个为图片添加圆角的在线处理工具，一键生成图片圆角的在线工具网站'),
    keywords: ['照片', '图片', '生成器'],
    component: () => import('./frame-loader.vue'),
    icon: VideoPlus,
    config: {
      remoteUrl: 'https://lzw.me/x/round-image/',
      hideHeader: true,
    },
    createdAt: new Date('2025-08-03'),
    category: 'Images',
  }),
  defineTool({
    path: '/png2ico',
    name: translate('tools.png2ico.title', [], '图片转 ICO 图标'),
    description: translate(
      'tools.png2ico.description',
      [],
      '本工具可将一张或多张 PNG、JPG 等格式的图片快速转换为 ICO 图标文件，适合制作网站 favicon.ico，全部处理在本地浏览器完成，安全高效。'
    ),
    keywords: ['照片', '图片', 'ico', 'png', '网站建设'],
    component: () => import('./frame-loader.vue'),
    icon: VideoPlus,
    config: {
      remoteUrl: 'https://lzw.me/x/png2ico/',
      hideHeader: true,
    },
    createdAt: new Date('2025-08-03'),
    category: 'Images',
  }),
  defineTool({
    path: '/idphotomaker',
    name: translate('tools.idphotomaker.title', [], '在线证件照换背景'),
    description: translate('tools.idphotomaker.description', [], '一个完全免费无限制的在线证件照换背景工具'),
    keywords: ['证件照', '背景', '免费'],
    component: () => import('./frame-loader.vue'),
    icon: CreditCard,
    config: {
      remoteUrl: 'https://lzw.me/x/idphotomaker/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Images',
  }),
  defineTool({
    path: '/saoma',
    name: translate('tools.saoma.title', [], '二维码在线扫码解码器'),
    description: translate(
      'tools.saoma.description',
      [],
      '一个二维码在线扫码解码工具。可以在浏览器里用摄像头扫描二维码、条形码并解码读取内容，或直接解码二维码图片、条形码图片的内容'
    ),
    keywords: ['二维码', '条形码', '解码', '浏览器'],
    component: () => import('./frame-loader.vue'),
    icon: QrCode2Outlined,
    config: {
      remoteUrl: 'https://lzw.me/x/saoma/',
      // hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Barcodes',
  }),
  defineTool({
    path: '/qrcode-scanner-online',
    name: translate('tools.qrcode-scanner-online.title', [], '在线二维码扫描工具'),
    description: translate('tools.qrcode-scanner-online.description', [], '在线二维码扫描工具，快速扫描并识别二维码内容。'),
    keywords: ['二维码', '解码', '浏览器'],
    component: () => import('./frame-loader.vue'),
    icon: QrCode2Outlined,
    config: {
      remoteUrl: 'https://lzw.me/x/qrcode-scanner-online/',
      hideHeader: true,
    },
    createdAt: new Date('2025-08-03'),
    category: 'Barcodes',
  }),
  defineTool({
    path: '/m3u8-player',
    name: translate('tools.m3u8player.title', [], 'm3u8视频在线播放器'),
    description: translate('tools.m3u8player.description', [], '一个M3U8在线播放器工具，支持输入 m3u8 文件地址，解析并播放视频'),
    keywords: ['m3u8', 'mp4', '播放器', '浏览器', '视频'],
    component: () => import('./frame-loader.vue'),
    icon: MusicNoteTwotone,
    config: {
      remoteUrl: 'https://m3u8-player.lzw.me',
      hideHeader: true,
    },
    createdAt: new Date('2025-08-03'),
    category: 'Images',
  }),
  defineTool({
    path: '/m3u8-downloader',
    name: translate('tools.m3u8downloader.title', [], 'M3U8视频在线转换MP4下载工具'),
    description: translate('tools.m3u8downloader.description', [], '一个M3U8在线转Mp4下载工具，无需下载软件，自动检测一键下载'),
    keywords: ['m3u8', 'mp4', '转换', '视频', '下载'],
    component: () => import('./frame-loader.vue'),
    icon: MusicNoteTwotone,
    config: {
      remoteUrl: 'https://m3u8-downloader.lzw.me',
      hideHeader: true,
    },
    createdAt: new Date('2025-08-03'),
    category: 'Images',
  }),
  defineTool({
    path: '/screentest',
    name: translate('tools.screentest.title', [], '屏幕坏点测试'),
    description: translate('tools.screentest.description', [], '屏幕坏点在线测试工具'),
    keywords: ['屏幕', '坏点', '屏幕测试', '坏点测试', '坏点检测'],
    component: () => import('./frame-loader.vue'),
    icon: ScreenShare,
    config: {
      remoteUrl: 'https://lzw.me/x/screentest/',
      // hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'measurement',
  }),
  defineTool({
    path: '/age-calc',
    name: translate('tools.age-calc.title', [], '年龄计算器'),
    description: translate(
      'tools.age-calc.description',
      [],
      '一个简洁友好的在线计算周岁和虚岁年龄的工具网站，也支持星座和生肖查询、存活天数计算等。'
    ),
    keywords: ['年龄', '计算器', '星座', '生肖查询', '农历生日'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/age-calc/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-23'),
    category: 'measurement',
  }),
  defineTool({
    path: '/fund',
    name: translate('tools.fund.title', [], '基金投资策略分析工具'),
    description: translate('tools.fund.description', [], '一个基金投资策略回测分析的在线工具。'),
    keywords: ['基金', '定投', '理财', '投资'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/fund/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-23'),
    category: 'measurement',
  }),
  defineTool({
    path: '/srihash',
    name: translate('tools.srihash.title', [], 'SRI Hash 在线生成器'),
    description: translate(
      'tools.srihash.description',
      [],
      '在浏览器本地基于 JavaScript 和 css 的访问链接，生成器 SRI hash 值，以供设置 integrity 属性参考使用。'
    ),
    keywords: ['SRI', '生成器', 'hash', '网站建设'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/srihash/',
      // hideHeader: true,
    },
    createdAt: new Date('2024-08-23'),
    category: 'web',
  }),
  defineTool({
    path: '/60s-daily-news',
    name: translate('tools.60s.title', [], '每日早报'),
    description: translate(
      'tools.60s.description',
      [],
      '每日早报：每日60秒快速了解世界发生的大事件！此外还提供了快速浏览头条热搜、微博热搜、B站热搜、历史上的今天等即时榜单信息。'
    ),
    keywords: ['新闻', '阅读', '榜单', '早报'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/60s/',
      // hideHeader: true,
    },
    createdAt: new Date('2024-08-27'),
    category: 'others',
  }),
  // defineTool({
  //   path: '/dailyhot',
  //   name: translate('tools.dailyhot.title', [], '今日新闻热榜聚合'),
  //   description: translate('tools.dailyhot.description', [], '汇集各大新闻平台的今日新闻热榜。'),
  //   keywords: ['news', '新闻', '榜单', '阅读'],
  //   component: () => import('./frame-loader.vue'),
  //   icon: MusicNoteTwotone,
  //   config: {
  //     remoteUrl: 'https://dailyhot.lzw.me',
  //     hideHeader: true,
  //   },
  //   createdAt: new Date('2025-08-03'),
  //   category: 'others',
  // }),
  defineTool({
    path: '/ghproxy',
    name: translate('tools.ghproxy.title', [], 'GitHub文件下载加速'),
    description: translate(
      'tools.ghproxy.description',
      [],
      '输入 github 文件地址，即可获取文件代理加速的下载链接。支持多站点选择、站点测速。'
    ),
    keywords: ['ghproxy', 'github', '代理', '下载'],
    component: () => import('./frame-loader.vue'),
    icon: MusicNoteTwotone,
    config: {
      remoteUrl: 'https://lzw.me/x/ghproxy',
      // hideHeader: true,
    },
    createdAt: new Date('2025-08-03'),
    category: 'others',
  }),
];
