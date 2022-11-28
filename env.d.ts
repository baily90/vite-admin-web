/// <reference types="vite/client" />
declare module 'x.vue' {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>
  export default component
}