import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  build: {
    outDir: 'lib',
    lib: {
			entry: path.resolve(__dirname, "./package/index.js"), //指定组件编译入口文件
			name: "jack-ui",
      fileName: (format) => `jack-ui.${format}.js`,
		},
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','ant-design-vue','vuedraggable'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})