/*
 * @Author: wlf fwl7747@126.com
 * @Date: 2025-08-29 03:20:29
 * @LastEditors: wlf fwl7747@126.com
 * @LastEditTime: 2025-08-29 03:42:22
 * @FilePath: \Veeink-Gatekeeper\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',  // 确保相对路径，部署到子路径也可用
  root: './',  // 指定根目录
})
