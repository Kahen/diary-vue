<template>
  <div class="dashboard-container">
    <!--    <div class="text-shadow-dark">{{getLocalDate()}}</div>-->
    <div class="dashboard-text">今天过得怎么样？</div>
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      value: new Date()
    }
  },
  methods: {
    getLocalDate() {
      const a = ['日', '一', '二', '三', '四', '五', '六']
      const week = new Date().getDay()
      const str = '星期' + a[week]
      const t = new Date()
      const year = t.getFullYear()
      const month = t.getMonth() + 1
      const day = t.getDate()
      return year + '年' + month + '月' + day + '日' + str
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
    line-height: 46px;
  }
}
</style>
