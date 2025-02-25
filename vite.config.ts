import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@pinia': '/node_modules/pinia/dist/pinia.mjs', // 强制指定路径（临时方案）
    },
  },
  plugins: [
    uni(),
  ],
})
