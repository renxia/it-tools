import { AB, Currency, Location, MapPin, ShieldLock } from '@vicons/tabler';
import { GamesSharp, MusicNoteRound } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const converters = [
  defineTool({
    path: '/coordinate',
    name: translate('tools.coordinate.title', [], '查询我的位置经纬度'),
    description: translate('tools.coordinate.description'),
    keywords: ['我的位置', '经纬度', '坐标系', '地图', '坐标系转换', '批量转换'],
    component: () => import('./frame-loader.vue'),
    icon: Location,
    config: {
      remoteUrl: 'https://lzw.me/x/coordinate/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-09'),
    category: 'Converters',
  }),
  defineTool({
    path: '/getpoint',
    name: translate('tools.getpoint.title', [], '经纬度坐标定位查询工具'),
    description: translate('tools.getpoint.description'),
    keywords: ['定位', '经纬度', '坐标系', '地图', '坐标定位', '坐标拾取系统'],
    component: () => import('./frame-loader.vue'),
    icon: MapPin,
    config: {
      remoteUrl: 'https://lzw.me/x/getpoint/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Converters',
  }),
  defineTool({
    path: '/wechat-dat',
    name: translate('tools.wechat-dat.title', [], '微信DAT照片解密转换器'),
    description: translate(
      'tools.wechat-dat.description',
      [],
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
    category: 'Converters',
  }),
  defineTool({
    path: '/ncm-to-mp3',
    name: translate('tools.ncm-to-mp3.title', [], '网易云音乐NCM转MP3格式'),
    description: translate(
      'tools.ncm-to-mp3.description',
      [],
      '本工具支持将网易云音乐(.ncm)、酷我音乐(.kwm)、QQ音乐(.mflac,.qlfac)、酷狗音乐(kgm)等加密格式的音乐文件解密转换为mp3格式，并且支持批量转换与下载功能。'
    ),
    keywords: ['mp3', '音乐', '解密'],
    component: () => import('./frame-loader.vue'),
    icon: MusicNoteRound,
    config: {
      remoteUrl: 'https://lzw.me/x/ncm-to-mp3/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Converters',
  }),
  defineTool({
    path: '/rmb',
    name: translate('tools.rmb.title', [], '人民币大写转换器'),
    description: translate('tools.rmb.description', [], '将阿拉伯数字格式的人民币金额转换成中文大写、人民币大写的在线转换工具'),
    keywords: ['人民币', '大写', '转换器'],
    component: () => import('./frame-loader.vue'),
    icon: Currency,
    config: {
      remoteUrl: 'https://lzw.me/x/rmb/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Converters',
  }),
  defineTool({
    path: '/random-password',
    name: translate('tools.random-password.title', [], '随机密码生成器'),
    description: translate(
      'tools.random-password.description',
      [],
      '这款在线随机密码生成工具可以帮助我们解决密码过于简单的问题，强化安全密码。'
    ),
    keywords: ['密码', '随机密码', '生成器'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/random-password/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Converters',
  }),
  defineTool({
    path: '/ip-query',
    name: translate('tools.ip-query.title', [], '我的公网IP'),
    description: translate('tools.ip-query.description', [], '获取我的公网 IP 工具，支持 ip 地址归属地批量查询。'),
    keywords: ['IP', '公网IP', 'IP归属地', '批量查询'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/ip/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-15'),
    category: 'Converters',
  }),
  defineTool({
    path: '/id-card-query',
    name: translate('tools.idcard-query.title', [], '身份证号码信息查询'),
    description: translate(
      'tools.idcard-query.description',
      [],
      '身份证号码信息免费在线查询网站，通过输入指定的身份证号码，可以查询分析出身份证发证地、出生日期、性别、年龄、农历生日、生肖等有效性等公开信息。'
    ),
    keywords: ['身份证', '查询'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/idcard-query/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-16'),
    category: 'Converters',
  }),
  defineTool({
    path: '/idcard',
    name: translate('tools.idcard.title', [], '身份证号码批量生成器'),
    description: translate('tools.idcard.description', [], '批量生成虚拟身份证号码，仅用于开发测试用途。'),
    keywords: ['身份证', '生成器', '批量生成'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/idcard/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-16'),
    category: 'Converters',
  }),
  defineTool({
    path: '/id-number-generator',
    name: translate('tools.id-number-generator.title', [], '身份证号银行卡号生成器'),
    description: translate(
      'tools.id-number-generator.description',
      [],
      '身份证号大全和姓名由程序随机组合而成，所有信息均为虚构生成，不会泄密真实公民隐私信息，也非现实生活中真实的身份证号码和真实姓名；身份证号码所属年龄均为18岁以上，均已通过校验；银行卡为工商银行E时代借记卡；身份证号码和姓名仅供测试或用在必须输入身份证号码和姓名的网站上，请不要将身份证号码和姓名用于任何非法用途，且自行承担使用本工具的任何后果和责任。'
    ),
    keywords: ['身份证', '生成器', '批量生成', '银行卡', '电话号码'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/id-number-generator/',
      hideHeader: true,
    },
    createdAt: new Date('2025-08-03'),
    category: 'Converters',
  }),
  defineTool({
    path: '/s2t',
    name: translate('tools.s2t.title', [], '简繁转换在线工具'),
    description: translate(
      'tools.s2t.description',
      [],
      '支持简体字、繁体字、火星文互相转换的工具。支持简体转繁体、繁体转简体、简体转火星文，一键生成火星文等功能'
    ),
    keywords: ['简体中文', '繁体中文', '简繁', '转换器'],
    component: () => import('./frame-loader.vue'),
    icon: AB,
    config: {
      remoteUrl: 'https://lzw.me/x/s2t/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
    category: 'Converters',
  }),
];
