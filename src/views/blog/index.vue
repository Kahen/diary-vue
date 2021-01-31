<template>
  <div style="display: flex">
    <div style="width: 200px;height: 1200px;margin: 40px;background: #409EFF"/>
    <div style="width: 100%;margin: 20px">
      <div class="infinite-list-wrapper" style="overflow:auto;height: 1200px;">
        <ul
          v-infinite-scroll="load"
          class="list"
          infinite-scroll-disabled="disabled"
          style="width: 100%;"
        >
          <li v-for="item in blogs" :key="item" class="list-item">
            <div style="display: flex">
              <el-avatar :size="45" :src="item.diaryUserDto.avatarUrl" fit="cover"
                         style="margin:0 10px 10px 10px;border: solid #eceef5 1px;"
              />
              <div class="box-card" style="width: 90%">
                <div slot="header" class="clearfix">

                  <span>{{ item.diaryUserDto.nickname }}</span>
                  <el-button style="float: right; padding: 3px 0" type="text">添加关注</el-button>
                </div>
                <div class="publish-time">{{ timeFormat(item.publishTime) }}</div>
                <div class="text item">
                  {{ item.content }}
                </div>
                <el-divider><i class="el-icon-c-scale-to-original"/></el-divider>
              </div>
            </div>
          </li>
        </ul>
        <p v-if="loading" style="text-align: center">加载中...</p>
        <p v-if="noMore" style="text-align: center">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import Blog from '@/api/blog/blog'

export default {
  data() {
    return {
      blogs: undefined,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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
  created() {
    this.getBlog()
  },
  methods: {

    getBlog() {
      Blog.homeLine().then(
        res => {
          this.blogs = res.content
          console.log(this.blogs)
        }
      )
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    timeFormat(time) {
      if (time > 0) {
        let result
        time = parseInt(time)
        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const month = day * 30
        const now = new Date().getTime()
        const diffValue = now - time
        if (diffValue < 0) {
          return
        }
        const monthC = diffValue / month
        const weekC = diffValue / (7 * day)
        const dayC = diffValue / day
        const hourC = diffValue / hour
        const minC = diffValue / minute
        if (monthC >= 1) {
          if (monthC <= 12) {
            result = '' + parseInt(monthC) + '月前'
          } else {
            result = '' + parseInt(monthC / 12) + '年前'
          }
        } else if (weekC >= 1) {
          result = '' + parseInt(weekC) + '周前'
        } else if (dayC >= 1) {
          result = '' + parseInt(dayC) + '天前'
        } else if (hourC >= 1) {
          result = '' + parseInt(hourC) + '小时前'
        } else if (minC >= 1) {
          result = '' + parseInt(minC) + '分钟前'
        } else {
          result = '刚刚'
        }
        return result
      } else {
        return ''
      }
    }

  }
}
</script>

<style scoped>
  .text {
    /*white-space:pre;*/
    white-space: pre-line;
    font-size: 16px;
    line-height: 24px;
  }

  .item {
    margin-top: 5px;
    margin-bottom: 18px;
  }

  .list-item {
    width: 100%;
    padding: 0 20px 20px 20px
  }

  .box-card {

  }

  .clearfix {
    font-size: 18px;
    font-weight: bold;
  }

  .infinite-list-wrapper::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }

  ul li {

    list-style: none;

  }

  .publish-time {
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 8px;
    color: #b3b4b6;
  }
</style>
