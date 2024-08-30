import { AB, CreditCard, Currency, Location, MapPin, ScreenShare, ShieldLock, VideoPlus } from '@vicons/tabler';
import { GamesSharp, MusicNoteRound, MusicNoteTwotone, QrCode2Outlined } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export { funs } from './funs';
export { Docs } from './documents';

export const getMyCoordinate = defineTool({
  path: '/coordinate',
  name: translate('tools.coordinate.title', '查询我的位置经纬度'),
  description: translate('tools.coordinate.description'),
  keywords: ['我的位置', '经纬度', '坐标系', '地图', '坐标系转换', '批量转换'],
  component: () => import('./frame-loader.vue'),
  icon: Location,
  config: {
    remoteUrl: 'https://lzw.me/x/coordinate/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-09'),
});

export const getPoint = defineTool({
  path: '/getpoint',
  name: translate('tools.getpoint.title', '经纬度坐标定位查询工具'),
  description: translate('tools.getpoint.description'),
  keywords: ['定位', '经纬度', '坐标系', '地图', '坐标定位', '坐标拾取系统'],
  component: () => import('./frame-loader.vue'),
  icon: MapPin,
  config: {
    remoteUrl: 'https://lzw.me/x/getpoint/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const screenTest = defineTool({
  path: '/screentest',
  name: translate('tools.screentest.title', '屏幕坏点测试'),
  description: translate('tools.screentest.description', '屏幕坏点在线测试工具'),
  keywords: ['屏幕', '坏点', '屏幕测试', '坏点测试', '坏点检测'],
  component: () => import('./frame-loader.vue'),
  icon: ScreenShare,
  config: {
    remoteUrl: 'https://lzw.me/x/screentest/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const wechatDat = defineTool({
  path: '/wechat-dat',
  name: translate('tools.wechat-dat.title', '微信DAT照片解密转换器'),
  description: translate(
    'tools.wechat-dat.description',
    '微信照片在线解密破解转换工具。使用本工具，可以无需密码，查看微信PC电脑版 images 目录 dat 格式的图片'
  ),
  keywords: ['微信', '破解', '解密', '微信照片查看', '微信照片破解'],
  component: () => import('./frame-loader.vue'),
  icon: ShieldLock,
  config: {
    remoteUrl: 'https://lzw.me/x/weixin-dat/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const videoSpider = defineTool({
  path: '/video-spider',
  name: translate('tools.video-spider.title', '短视频去水印下载工具'),
  description: translate(
    'tools.video-spider.description',
    '免费的在线短视频去水印解析下载工具。已支持：抖音/皮皮虾/火山/微视/微博/绿洲/最右/轻视频/快手/全民小视频/皮皮搞笑/巴塞电影/陌陌/Before避风/开眼/Vue Vlog/小咖秀/全民K歌'
  ),
  keywords: ['短视频', '水印', '破解', '抖音视频下载'],
  component: () => import('./frame-loader.vue'),
  icon: VideoPlus,
  config: {
    remoteUrl: 'https://lzw.me/x/video_spider/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const s2t = defineTool({
  path: '/s2t',
  name: translate('tools.s2t.title', '简繁转换在线工具'),
  description: translate(
    'tools.s2t.description',
    '支持简体字、繁体字、火星文互相转换的工具。支持简体转繁体、繁体转简体、简体转火星文，一键生成火星文等功能'
  ),
  keywords: ['简体中文', '繁体中文', '简繁', '转换'],
  component: () => import('./frame-loader.vue'),
  icon: AB,
  config: {
    remoteUrl: 'https://lzw.me/x/s2t/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const idphotomaker = defineTool({
  path: '/idphotomaker',
  name: translate('tools.idphotomaker.title', '在线证件照换背景'),
  description: translate('tools.idphotomaker.description', '一个完全免费无限制的在线证件照换背景工具'),
  keywords: ['证件照', '背景', '免费'],
  component: () => import('./frame-loader.vue'),
  icon: CreditCard,
  config: {
    remoteUrl: 'https://lzw.me/x/idphotomaker/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const ncmToMp3 = defineTool({
  path: '/ncm-to-mp3',
  name: translate('tools.ncm-to-mp3.title', '网易云音乐NCM转MP3格式'),
  description: translate(
    'tools.ncm-to-mp3.description',
    '本工具支持将网易云音乐(.ncm)、酷我音乐(.kwm)、QQ音乐(.mflac,.qlfac)、酷狗音乐(kgm)等加密格式的音乐文件解密转换为mp3格式，并且支持批量转换与下载功能。'
  ),
  keywords: ['证件照', '背景', '免费'],
  component: () => import('./frame-loader.vue'),
  icon: MusicNoteRound,
  config: {
    remoteUrl: 'https://lzw.me/x/ncm-to-mp3/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const rmb = defineTool({
  path: '/rmb',
  name: translate('tools.rmb.title', '人民币大写转换器'),
  description: translate('tools.rmb.description', '将阿拉伯数字格式的人民币金额转换成中文大写、人民币大写的在线转换工具'),
  keywords: ['人民币', '大写', '转换器'],
  component: () => import('./frame-loader.vue'),
  icon: Currency,
  config: {
    remoteUrl: 'https://lzw.me/x/rmb/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const saoma = defineTool({
  path: '/saoma',
  name: translate('tools.saoma.title', '二维码在线扫码解码器'),
  description: translate(
    'tools.saoma.description',
    '一个二维码在线扫码解码工具。可以在浏览器里用摄像头扫描二维码、条形码并解码读取内容，或直接解码二维码图片、条形码图片的内容'
  ),
  keywords: ['二维码', '条形码', '解码', '浏览器'],
  component: () => import('./frame-loader.vue'),
  icon: QrCode2Outlined,
  config: {
    remoteUrl: 'https://lzw.me/x/saoma/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const m3u8Player = defineTool({
  path: '/m3u8-player',
  name: translate('tools.m3u8player.title', 'm3u8视频在线播放器'),
  description: translate('tools.m3u8player.description', '一个M3U8在线播放器工具，支持输入 m3u8 文件地址，解析并播放视频'),
  keywords: ['m3u8', 'mp4', '播放器', '浏览器'],
  component: () => import('./frame-loader.vue'),
  icon: MusicNoteTwotone,
  config: {
    remoteUrl: 'https://lzw.me/x/m3u8-player/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const relationship = defineTool({
  path: '/relationship',
  name: translate('tools.relationship.title', '中国亲戚关系计算器'),
  description: translate(
    'tools.relationship.description',
    '一款最为全面准确的亲戚称呼计算器及亲戚关系在线查询工具，逢年过节走亲访友必备神器，亦可作为家庭启蒙教育应用。'
  ),
  keywords: ['亲戚', '计算器', '亲戚称谓'],
  component: () => import('./frame-loader.vue'),
  icon: MusicNoteTwotone,
  config: {
    remoteUrl: 'https://lzw.me/x/relationship/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const randomPassword = defineTool({
  path: '/random-password',
  name: translate('tools.random-password.title', '随机密码生成器'),
  description: translate('tools.random-password.description', '这款在线随机密码生成工具可以帮助我们解决密码过于简单的问题，强化安全密码。'),
  keywords: ['密码', '随机密码', '密码生成器'],
  component: () => import('./frame-loader.vue'),
  icon: GamesSharp,
  config: {
    remoteUrl: 'https://lzw.me/x/random-password/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-13'),
});

export const ipQuery = defineTool({
  path: '/ip-query',
  name: translate('tools.ip-query.title', '我的公网IP'),
  description: translate('tools.ip-query.description', '获取我的公网 IP 工具，支持 ip 地址归属地批量查询。'),
  keywords: ['我的IP', '公网IP', 'IP归属地', '批量查询'],
  component: () => import('./frame-loader.vue'),
  icon: GamesSharp,
  config: {
    remoteUrl: 'https://lzw.me/x/ip/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-15'),
});

export const idcard = defineTool({
  path: '/idcard',
  name: translate('tools.idcard.title', '身份证号码批量生成器'),
  description: translate('tools.idcard.description', '批量生成虚拟身份证号码，仅用于开发测试用途。'),
  keywords: ['身份证', '生成器', '批量生成', '身份证号码'],
  component: () => import('./frame-loader.vue'),
  icon: GamesSharp,
  config: {
    remoteUrl: 'https://lzw.me/x/idcard/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-16'),
});

export const ageCalc = defineTool({
  path: '/age-calc',
  name: translate('tools.age-calc.title', '年龄计算器'),
  description: translate(
    'tools.age-calc.description',
    '一个简洁友好的在线计算周岁和虚岁年龄的工具网站，也支持星座和生肖查询、存活天数计算等。'
  ),
  keywords: ['年龄计算器', '星座查询', '生肖查询', '活了多久', '农历生日'],
  component: () => import('./frame-loader.vue'),
  icon: GamesSharp,
  config: {
    remoteUrl: 'https://lzw.me/x/age-calc/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-23'),
});

export const fund = defineTool({
  path: '/fund',
  name: translate('tools.fund.title', '基金投资策略分析工具'),
  description: translate('tools.fund.description', '一个基金投资策略回测分析的在线工具。'),
  keywords: ['基金', '定投', '理财', '投资'],
  component: () => import('./frame-loader.vue'),
  icon: GamesSharp,
  config: {
    remoteUrl: 'https://lzw.me/x/fund/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-23'),
});

export const sriHash = defineTool({
  path: '/srihash',
  name: translate('tools.srihash.title', 'SRI Hash 在线生成器'),
  description: translate(
    'tools.srihash.description',
    '在浏览器本地基于 JavaScript 和 css 的访问链接，生成器 SRI hash 值，以供设置 integrity 属性参考使用。'
  ),
  keywords: ['SRI', '生成器', 'hash', '网站建设'],
  component: () => import('./frame-loader.vue'),
  icon: GamesSharp,
  config: {
    remoteUrl: 'https://lzw.me/x/srihash/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-23'),
});

export const dailyNews = defineTool({
  path: '/60s-daily-news',
  name: translate('tools.60s.title', '每日早报'),
  description: translate(
    'tools.60s.description',
    '每日早报：每日60秒快速了解世界发生的大事件！此外还提供了快速浏览头条热搜、微博热搜、B站热搜、历史上的今天等即时榜单信息。'
  ),
  keywords: ['新闻', '阅读', '榜单', '早报'],
  component: () => import('./frame-loader.vue'),
  icon: GamesSharp,
  config: {
    remoteUrl: 'https://lzw.me/x/60s/',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-27'),
});
