// lazy loading Components
// https://github.com/vuejs/vue-router/blob/dev/examples/lazy-loading/app.js#L8
const loadView = (name, index = false) => () => import(`@/views/${name}${index ? '/index' : ''}.vue`)
const loadDoc = (name) => () => import(`@/docs/${name}.md`)
export { loadView, loadDoc }
