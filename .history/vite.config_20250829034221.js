import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',  // 确保相对路径，部署到子路径也可用
  root: './',  // 指定根目录
})
