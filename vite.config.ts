import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' //导入包
import { resolve } from 'path';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  console.log(env.VITE_API_PROXY_URL);

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        '~/': `${resolve(__dirname, 'src')}/`,
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/styles/element/index.scss" as *;
            @use "~/styles/mixins/_index.scss" as *;
          `,
        },
      },
    },
    plugins: [
      vue(),
      // 增加下面的配置项,这样在运行时就能检查eslint规范
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      }),
      AutoImport({
        dirs: ['src/composables', 'src/shared'],
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router', '@vueuse/core'],

        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: resolve(pathSrc, 'types/auto-imports.d.ts'),
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'tsx'],
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        dts: resolve(pathSrc, 'types/components.d.ts'),
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }

})
