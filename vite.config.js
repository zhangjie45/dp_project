import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "./src/assets/utils.scss";`
      }
    }
  },
   resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
  server: {
    host: "0.0.0.0",
    open: true,
  },

})
