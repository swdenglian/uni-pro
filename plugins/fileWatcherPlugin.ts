import path from 'node:path'
import chokidar from 'chokidar'
import debounce from 'lodash/debounce'
import { execPromise } from '../scripts/execPromise'

const PAGES_TS_PATH = path.resolve(__dirname, './src/pages.ts')
const doChange: any = debounce(async (file: string) => {
  const regex = /(?=.*\/ui\/pages\/)(?:[^/]+\/)*index\.vue$/
  console.log(file, regex.test(file))
  // 检查是否匹配需要监听的文件
  if (file === PAGES_TS_PATH || regex.test(file)) {
    console.log(`文件[${file}]变化, 重新构建 pages.json`)
    await execPromise('pnpm run build:pages')
  }
}, 50)

export default function fileWatcherPlugin(watchPath: string) {
  return {
    name: 'file-watcher',
    async config(config) {
      const watcher = chokidar.watch(watchPath, {
        ignored: /(^|[/\\])\../, // 忽略点文件
        persistent: true,
      })

      watcher
        .on('add', doChange)
        .on('unlink', doChange)

      return config
    },
  }
}
