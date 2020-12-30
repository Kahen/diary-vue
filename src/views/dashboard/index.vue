<template>
  <div class="dashboard-container">
    <!--        <div class="text-shadow-dark">{{getLocalDate()}}</div>-->
    <!--    <div class="dashboard-text">今天过得怎么样？</div>-->

    <div class="el-container" style="display: inline-block;width: 100%">
      <div class="dashboard-text" style="float: left; width: 30%;margin: 30px;">
        <p style="font-size: large;font-weight: 500">{{ getLocalDate() }}</p>
        {{ getSweet() }}
      </div>

      <div class="el-container" style="width:50%;float:right;display: flex;justify-content: right">
        <div style="width: 100%">
          <div style="width: 60%;margin: 30px;float: right">
            <p class="article" style="text-align: right">
              {{ motto }}</p>
            <p class="author" style="text-align: right">- {{ author }}</p></div>
        </div>

      </div>
    </div>
    <el-calendar v-model="value" slot="dateCell">
    </el-calendar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findAll } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      motto: '',
      author: '',
      value: new Date()
    }
  },
  created() {
    this.findAllMottos()
  },
  methods: {
    findAllMottos() {
      findAll().then(res => {
        var number = new Date().getMilliseconds() % res.content.length
        this.motto = res.content[number].content
        this.author = res.content[number].author
      })
    },
    getLocalDate() {
      const a = ['日', '一', '二', '三', '四', '五', '六']
      const date = new Date()
      const week = date.getDay()
      const str = '星期' + a[week]
      let result = ''
      let hours = date.getHours()
      if (hours <= 4) {
        result = '凌晨'
      } else if (4 < hours && hours <= 7) {
        result = '拂晓'
      } else if (7 < hours && hours <= 11) {
        result = '上午'
      } else if (11 < hours && hours <= 13) {
        result = '中午'
      } else if (13 < hours && hours <= 18) {
        result = '下午'
      } else if (18 < hours && hours <= 22) {
        result = '晚上'
      } else if (22 < hours && hours <= 24) {
        result = '深夜'
      }
      return str + ' ' + result + ' ' + hours + ':' + date.getMinutes()
    },
    getSweet() {
      const jsonStr = JSON.parse('[{"hour":4,"contents":["夜深了，还不睡吗？","让思绪慢下来。"]},{"hour":7,"contents":["早上好。","今天又是元气满满的一天。","一日之计在于晨。"]},{"hour":11,"contents":["上午好。","保持微笑。","那么，去做吧。"]},{"hour":13,"contents":["中午好。","走动一下。"]},{"hour":18,"contents":["下午好。","来杯咖啡提提神?","保持好奇。"]},{"hour":22,"contents":["晚上好。","今天过得怎么样？"]},{"hour":24,"contents":["做个好梦。","关爱自己。"]}]')
      let result = ''
      let hours = new Date().getHours()
      if (hours <= 4) {
        let key = new Date().getMilliseconds() % jsonStr[0].contents.length
        result = jsonStr[0].contents[key]
      } else if (4 < hours && hours <= 7) {
        let key = new Date().getMilliseconds() % jsonStr[1].contents.length
        result = jsonStr[1].contents[key]
      } else if (7 < hours && hours <= 11) {
        let key = new Date().getMilliseconds() % jsonStr[2].contents.length
        result = jsonStr[2].contents[key]
      } else if (11 < hours && hours <= 13) {
        let key = new Date().getMilliseconds() % jsonStr[3].contents.length
        result = jsonStr[3].contents[key]
      } else if (13 < hours && hours <= 18) {
        let key = new Date().getMilliseconds() % jsonStr[4].contents.length
        result = jsonStr[4].contents[key]
      } else if (18 < hours && hours <= 22) {
        let key = new Date().getMilliseconds() % jsonStr[5].contents.length
        result = jsonStr[5].contents[key]
      } else if (22 < hours && hours <= 24) {
        let key = new Date().getMilliseconds() % jsonStr[6].contents.length
        result = jsonStr[6].contents[key]
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    //line-height: 46px;
  }
}

.article {
  font-style: italic;
  font-size: 18px;
  color: #707070;
}

.author {
  font-style: italic;
  font-size: 16px;
  color: #707070;
}
</style>
