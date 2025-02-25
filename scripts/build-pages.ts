import fs from 'node:fs'
import path from 'node:path'

// 定义页面目录（根据实际项目调整）
const rootDir = path.resolve(__dirname, '../')
const pagesDir = path.resolve(rootDir, 'src/ui/pages')

// 生成 pages.json 配置
function generatePagesConfig(dir: string) {
  const files = fs.readdirSync(dir)
  const pages = []

  files.forEach((file) => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // 嵌套目录生成子包路由
      pages.push({
        path: `ui/pages/${file}/index`,
        style: { navigationBarTitleText: file },
      })
    }
    else if (file.endsWith('.vue')) {
      // 普通页面生成路由
      const pagePath = file === 'index.vue' ? '' : `/${file.replace('.vue', '')}`
      pages.push({
        path: `pages/${pagePath}`,
        style: { navigationBarTitleText: file.replace('.vue', '') },
      })
    }
  })

  return pages
}

export async function createPages() {
  await new Promise((r) => {
    setTimeout(r, 1000)
  })

  await import('../src/pages')
  const { pagesJson } = await import('../src/pages')
  const pagesConfig = {
    ...pagesJson,
    pages: generatePagesConfig(pagesDir),
  }

  // 写入 pages.json 文件
  fs.writeFileSync(path.resolve(rootDir, 'src/pages.json'), JSON.stringify(pagesConfig, null, 2))
}

createPages()
