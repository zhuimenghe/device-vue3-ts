import hasRole from './hasRole'


export default {
  install(Vue: any) {
    Vue.directive('has-role', hasRole)
  }
}