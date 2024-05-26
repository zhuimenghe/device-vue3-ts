import directives from './directives'
import properties from './properties'

export { directives, properties }

export default {
  install(Vue: any) {
    Vue.use(directives)
    Vue.use(properties)
  }
}
