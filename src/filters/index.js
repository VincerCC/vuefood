import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateString', function (value, formatStr) {
  return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss')
})
