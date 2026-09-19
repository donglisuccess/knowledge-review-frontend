import type { Question } from '../types/quiz'

/** 示例题库：前端知识复习题，后续可替换为接口获取 */
export const questions: Question[] = [
  {
    id: 1,
    type: 'single',
    category: 'Vue3',
    text: '在 <script setup> 中，用于声明一个响应式引用类型（基本值）状态的 API 是？',
    options: ['ref()', 'reactive()', 'computed()', 'watch()'],
    answer: [0],
    explanation:
      'ref() 用于包装基本类型或对象并返回带 .value 的响应式引用；reactive() 只能代理对象类型；computed() 是计算属性；watch() 用于侦听数据变化。',
  },
  {
    id: 2,
    type: 'single',
    category: 'Vue3',
    text: '下列关于 v-if 与 v-show 的说法，正确的是？',
    options: [
      'v-show 切换时会真正销毁并重建元素',
      'v-if 是通过 CSS display 属性控制显示隐藏',
      'v-if 为 false 时元素不会被渲染到 DOM 中',
      '两者在频繁切换场景下的性能完全相同',
    ],
    answer: [2],
    explanation:
      'v-if 是「真正」的条件渲染，为 false 时元素不存在于 DOM；v-show 只是切换 display 样式，元素始终被渲染。频繁切换适合用 v-show，条件很少变化适合用 v-if。',
  },
  {
    id: 3,
    type: 'multiple',
    category: 'Vue3',
    text: '下列哪些属于 Vue3 相对于 Vue2 的主要变化？',
    options: [
      '引入组合式 API（Composition API）',
      '使用 Proxy 重写响应式系统',
      '移除了过滤器（filter）',
      '不再支持 TypeScript',
    ],
    answer: [0, 1, 2],
    explanation:
      'Vue3 引入组合式 API、用 Proxy 替代 Object.defineProperty 实现响应式，并移除了过滤器（改用计算属性或方法）。Vue3 恰恰对 TypeScript 的支持更好。',
  },
  {
    id: 4,
    type: 'single',
    category: 'TypeScript',
    text: '下列哪个工具类型可以将对象类型中的所有属性变为可选？',
    options: ['Required<T>', 'Partial<T>', 'Pick<T, K>', 'Omit<T, K>'],
    answer: [1],
    explanation:
      'Partial<T> 将所有属性变为可选；Required<T> 相反，将所有属性变为必选；Pick<T, K> 选取部分属性；Omit<T, K> 排除指定属性。',
  },
  {
    id: 5,
    type: 'judge',
    category: 'TypeScript',
    text: 'TypeScript 中的 interface 在编译为 JavaScript 后仍然保留，可在运行时使用。',
    options: ['正确', '错误'],
    answer: [1],
    explanation:
      'interface 仅存在于编译期做类型检查，编译产物中会被完全擦除；如需运行时校验，需要借助类型守卫或 zod 等校验库。',
  },
  {
    id: 6,
    type: 'multiple',
    category: 'JavaScript',
    text: '下列哪些是 Promise 实例上的方法？',
    options: ['then()', 'catch()', 'finally()', 'all()'],
    answer: [0, 1, 2],
    explanation:
      'then / catch / finally 是 Promise 实例方法；Promise.all() 是静态方法，直接通过 Promise 构造函数调用，而不是实例方法。',
  },
  {
    id: 7,
    type: 'judge',
    category: 'Vue3',
    text: 'Vue3 中 watch 与 watchEffect 的依赖收集方式相同，都需要显式指定侦听的数据源。',
    options: ['正确', '错误'],
    answer: [1],
    explanation:
      'watch 需要显式指定侦听源；watchEffect 则会自动追踪回调中用到的所有响应式依赖，无需显式声明。',
  },
  {
    id: 8,
    type: 'single',
    category: '工程化',
    text: 'Vite 开发服务器实现模块按需编译所依赖的浏览器能力是？',
    options: ['Webpack 打包后的按需加载', '原生 ESM（ES Modules）', 'CommonJS require', 'Web Worker'],
    answer: [1],
    explanation:
      'Vite 开发环境基于浏览器原生 ES Modules，按需编译请求的模块，无需整体打包，因此冷启动极快；生产环境则使用 Rollup 打包。',
  },
]
