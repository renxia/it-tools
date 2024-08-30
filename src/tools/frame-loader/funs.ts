import { Lifebuoy } from '@vicons/tabler';
import { GamesSharp, MusicNoteSharp, MusicOffRound, VideoCameraFrontOutlined, WallpaperSharp } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const funs = [
  defineTool({
    path: '/djt',
    name: translate('tools.djt.title', '毒鸡汤'),
    description: translate('tools.djt.description', '精选经典毒鸡汤，搞笑好玩的人生调侃段子语录大全，每天来一碗，治愈又励志'),
    keywords: ['毒鸡汤', '段子', '语录', '调侃'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/pages/djt/?type=djt',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
  }),
  defineTool({
    path: '/short-videos',
    name: translate('tools.short-videos.title', '休闲短视频'),
    description: translate('tools.short-videos.description', '美女短视频随机看，休闲时刻放松心情'),
    keywords: ['人生', 'life', '模拟器', '小游戏'],
    component: () => import('./frame-loader.vue'),
    icon: VideoCameraFrontOutlined,
    config: {
      remoteUrl: 'https://lzw.me/v/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
  }),
  defineTool({
    path: '/liferestart',
    name: translate('tools.liferestart.title', '人生重开模拟器'),
    description: translate('tools.liferestart.description', '人生重开模拟器： liferestart life restart remake 人生重来一次会怎样？'),
    keywords: ['人生', 'life', '模拟器', '小游戏'],
    component: () => import('./frame-loader.vue'),
    icon: Lifebuoy,
    config: {
      remoteUrl: 'https://lzw.me/x/liferestart/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
  }),
  defineTool({
    path: '/163musichot',
    name: translate('tools.163musichot.title', '云音乐热评墙'),
    description: translate('tools.163musichot.description', '网易云音乐热评榜，免广告在线听音乐'),
    keywords: ['云音乐', '网易云', '音乐', '歌曲'],
    component: () => import('./frame-loader.vue'),
    icon: MusicNoteSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/163musichot/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
  }),
  defineTool({
    path: '/wallpaper',
    name: translate('tools.wallpaper.title', '高清电脑壁纸'),
    description: translate(
      'tools.wallpaper.description',
      '免费的在线电脑壁纸！提供高清电脑壁纸无需登录下载，包括美女,游戏,动漫,动物,汽车,体育,广告,影视,明星,风景,绘画,节日,花卉等经典壁纸'
    ),
    keywords: ['壁纸', '高清壁纸', '美女壁纸', '4k壁纸'],
    component: () => import('./frame-loader.vue'),
    icon: WallpaperSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/wallpaper/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
  }),
  defineTool({
    path: '/relax',
    name: translate('tools.relax.title', '白噪音促眠'),
    description: translate('tools.relax.description', '一款免下载的在线白噪音工具，让白噪音放松你的心情'),
    keywords: ['白噪音', '促眠', '在线播放', '免费工具'],
    component: () => import('./frame-loader.vue'),
    icon: MusicOffRound,
    config: {
      remoteUrl: 'https://lzw.me/x/relax/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
  }),
  defineTool({
    path: '/mikutap',
    name: translate('tools.mikutap.title', 'Mikutap'),
    description: translate(
      'tools.mikutap.description',
      '初音未来版本的休闲解压应用，通过点击或触摸屏幕播放声音并出现变化多端图案的互动内容'
    ),
    keywords: ['mikutap', 'Music', '初音未来', '解压', '有趣'],
    component: () => import('./frame-loader.vue'),
    icon: MusicOffRound,
    config: {
      remoteUrl: 'https://lzw.me/x/mikutap/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-13'),
  }),
  defineTool({
    path: '/color-avatar',
    name: translate('tools.color-avatar.title', '卡通头像生成器'),
    description: translate('tools.color-avatar.description', '一个简单好玩的在线卡通多彩头像生成器。'),
    keywords: ['卡通', '生成器', '头像', '情侣头像'],
    component: () => import('./frame-loader.vue'),
    icon: GamesSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/color-avatar/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-23'),
  }),
];
