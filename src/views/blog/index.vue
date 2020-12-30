<template>
  <div style="display: flex">
    <div style="width: 200px;height: 1200px;margin: 40px;background: #409EFF"></div>
    <div style="width: 100%;margin: 20px">
      <div class="infinite-list-wrapper" style="overflow:auto;height: 1200px;">
        <ul
          class="list"
          infinite-scroll-disabled="disabled"
          style="width: 100%;" v-infinite-scroll="load">
          <li class="list-item" style="width: 100%;padding: 0 20px 20px 20px" v-for="i in count">
            <el-card class="box-card" shadow="false" style="width: 100%;">
              <div class="clearfix" slot="header">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div :key="o" class="text item" v-for="o in 4">
                {{'列表内容 '+'i='+i+'o:' + o }}
              </div>
            </el-card>
          </li>
        </ul>
        <p style="text-align: center" v-if="loading">加载中...</p>
        <p style="text-align: center" v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 10,
        loading: false
      }
    },
    computed: {
      noMore() {
        return this.count >= 20
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    methods: {
      load() {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
