import './scss/main.scss'

import SxLine from './packages/line'
import SxHistogram from './packages/histogram'
import SxPie from './packages/pie'
import SxRadar from './packages/radar'
import SxBar from './packages/bar'
import SxScatter from './packages/scatter'

const components = [SxLine, SxHistogram, SxPie, SxRadar, SxBar, SxScatter]

function install(_Vue) {
  components.forEach(comp => {
    _Vue.component(comp.name, comp)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install,
  ...components,
}
