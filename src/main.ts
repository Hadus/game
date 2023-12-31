import { createApp } from 'vue';
import { createPinia } from 'pinia';
// element plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
// 引入 css
import '@a/css/index.less'
import App from './App.vue';
import router from './router';
// svgIcon component
import 'virtual:svg-icons-register';
import svgIcon from '@c/SvgIcon';


import { usePermissStore } from './store/permiss';
const app = createApp(App);
app.use(createPinia());
app.use(router);
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册 svg
app.component('svg-icon', svgIcon);

// 自定义权限指令
const permiss = usePermissStore();
app.directive('permiss', {
  mounted(el, binding) {
    if (!permiss.key.includes(String(binding.value))) {
      el['hidden'] = true;
    }
  },
});

app.mount('#app');
