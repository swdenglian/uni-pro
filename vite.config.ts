import path from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'

import { defineConfig } from 'vite'
import fileWatcherPlugin from './plugins/fileWatcherPlugin'
import { execPromise } from './scripts/execPromise'

// 定义需要监听的文件路径模式
const PAGES_DIR_PATH = path.resolve(__dirname, './src/ui/pages')

export default defineConfig(async () => {
  try {
    await execPromise('npm run build:pages')
  }
  catch (error) {
    console.error('Build pages failed:', error)
    process.exit(1)
  }

  return {
    resolve: {
      alias: {
        '@pinia': '/node_modules/pinia/dist/pinia.mjs',
      },
    },
    plugins: [
      fileWatcherPlugin(PAGES_DIR_PATH),
      uni(),
    ],
  }
})
