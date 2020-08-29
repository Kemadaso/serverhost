import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/antd.css'

import {
  Upload,
  Button,
  Menu,
  Icon,
  Dropdown,
  Breadcrumb,
  Tag,
  Row,
  Col,
  List,
  Alert,
  Input,
  Select,
  Checkbox,
  Radio,
  Empty,
  Modal,
  Tabs,
  Collapse,
  Card,
  Popover
  
} from 'ant-design-vue'


Vue.use(Upload)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
Vue.use(List)
Vue.use(Alert)


//Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
