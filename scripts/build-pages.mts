import fs from 'node:fs'
import path from 'node:path'
import * as glob from 'glob'

// 定义页面目录（根据实际项目调整）
const rootDir = path.resolve(__dirname, '../')
const pagesDir = path.resolve(rootDir, 'src/ui/pages')

// 生成 pages.json 配置
function generatePagesConfig(dir: string) {
  // 使用 glob 匹配所有层级的 index.vue
  const indexPaths = glob.sync(path.join(dir, '**', 'index.vue'))

  return indexPaths.map((filePath) => {
    // 构建相对于 ui/pages 的路径
    const relativePath = path.relative(pagesDir, filePath).replace(/\\/g, '/')
    const pathArray = relativePath.split('/')
    // 去掉文件名，保留目录层级
    const pagePath = pathArray.slice(0, -1).join('/')
    return {
      path: `ui/pages/${pagePath}/index`,
      style: { navigationStyle: 'custom' },
    }
  }).filter(Boolean)
}

export async function createPages() {
  await new Promise(r => setTimeout(r, 1000)) // 添加异步等待

  // 动态导入 pages 配置（保留原有配置）
  const { pagesJson } = await import('../src/pages')

  // 生成新的页面配置
  const pagesConfig = {
    ...pagesJson,
    pages: generatePagesConfig(pagesDir),
  }

  // 写入 pages.json 文件
  fs.writeFileSync(
    path.resolve(rootDir, 'src/pages.json'),
    JSON.stringify(pagesConfig, null, 2),
  )
}

await createPages()
