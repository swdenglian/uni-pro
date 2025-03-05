import { Screens } from './route.const'

export const tabConfig = [
  {
    name: 'Home',
    text: '首页',
    path: Screens.Home,
    icon: {
      size: {
        width: '46rpx',
        height: '46rpx',
      },
      normal: '/static/pages/home/device.png',
      active: '/static/pages/home/active-device.png',
    },
  },
  {
    name: 'components',
    text: '组件',
    path: Screens.HomeComponents,
    icon: {
      size: {
        width: '45rpx',
        height: '45rpx',
      },
      normal: '/static/pages/home/components.png',
      active: '/static/pages/home/active-components.png',
    },
  },
  {
    name: 'mine',
    text: '我的',
    path: Screens.HomeMine,
    icon: {
      size: {
        width: '56rpx',
        height: '50rpx',
      },
      normal: '/static/pages/home/mine.png',
      active: '/static/pages/home/active-mine.png',
    },
  },
]

function createTabBarValue() {
  return {
    list: tabConfig.map((item) => {
      return {
        pagePath: item.path.replace('/', ''),
        text: item.text,
        iconPath: item.icon.normal,
        selectedIconPath: item.icon.active,
      }
    }),
  }
}

export const pagesJson = {
  home: 'ui/pages/home/index',
  easycom: {
    autoscan: true,
    custom: {
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
  pages: [
    // 将会自动塞入
  ],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F2',
  },
  tabBar: createTabBarValue(),
}
