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
              <el-avatar
                :size="45"
                :src="item.diaryUserDto.avatarUrl"
                fit="cover"
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
                <!--                <div  style="width: 500px;display: flex;">-->

                <div v-if="item.imgDto" class="blockDiv">
                  <div
                    v-for="img in parseImgUrl(item.imgDto.imgUrl)"
                    :key="img"
                    :preview-src-list="parseImgUrl(item.imgDto.imgUrl)"
                    class="block"
                  >
                    <el-image
                      :src="img"
                      fit="cover"
                    />
                  </div>
                </div>

                <!--                  <div
                                      v-for="img in parseImgUrl(item.imgDto.imgUrl)"
                                      :key="img"
                                      style="width: 150px;height:150px;margin: 10px"
                                      :preview-src-list="parseImgUrl(item.imgDto.imgUrl)"
                                    >
                                      <el-image
                                        :src="img"
                                        fit="cover"
                                        style="margin: 10px;width:100px;overflow: hidden"
                                      />
                                    </div>-->

                <!--                </div>-->
                <div class="blog_under">
                  <el-divider direction="vertical"/>

                  <div v-if="!item.collect" class="under_item" type="button" @click="changeCollect(item)"><img
                    src="@/assets/collect.png"
                  >{{ item.collectCount == 0 ? '收藏' : item.collectCount }}
                  </div>
                  <div v-else class="under_item_active" type="button" @click="changeCollect(item)"><img
                    src="@/assets/collect_active.png"
                  >{{ item.collectCount }}
                  </div>
                  <el-divider direction="vertical"/>
                  <div class="under_item"><img
                    alt=""
                    src="@/assets/repost.png"
                  >{{ item.repostCount == 0 ? '转发' : item.repostCount }}
                  </div>
                  <el-divider direction="vertical"/>
                  <div class="under_item" @click="showComment(item)">
                    <!--                    <img alt="" src="@/assets/comment.png">-->
                    <span class="el-icon-chat-dot-round"/>
                    {{ item.commentCount == 0 ? '评论' : item.commentCount }}
                  </div>
                  <el-divider direction="vertical"/>
                  <div v-if="!item.like" class="under_item" @click="changeLike(item)"><img
                    alt=""
                    src="@/assets/like.png"
                  >{{ item.likeCount == 0 ? '赞' : item.likeCount }}
                  </div>
                  <div v-else class="under_item_active" @click="changeLike(item)"><img
                    src="@/assets/like_active.png"
                  >{{ item.likeCount }}
                  </div>
                  <el-divider direction="vertical"/>
                </div>
                <!--                <div v-show="item.commentShow" style="width: 200px;height: 100px;background: #20a0ff;" />-->
                <el-collapse-transition>
                  <div v-show="item.commentShow">
                    <div style="width: 200px;height: 100px;background: #20a0ff;"/>
                  </div>
                </el-collapse-transition>
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
import Like from '@/api/blog/like'
import collect from '@/api/blog/collect'
import comment from '@/api/blog/comment'

export default {
  data() {
    return {
      commentShow: false,
      blogs: [],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      count: 10,
      loading: false,
      page: 0,
      final: 2
      // like: true,
      // collect: true
    }
  },
  computed: {
    noMore() {
      return this.blogs.length >= this.final
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.getBlog(this.page, this.count)
  },
  methods: {
    showComment(item) {
      const indexOf = this.blogs.indexOf(item)
      this.blogs[indexOf].commentShow = !this.blogs[indexOf].commentShow
      comment.findByBlog(item.blogId, 0, 10)
    },
    changeCollect(blog) {
      let id = ''
      if (blog.collect != null) {
        id = blog.collect.collectId
      }
      collect.createOrUpdate(blog.blogId, id).then(
        res => {
          const indexOf = this.blogs.indexOf(blog)
          if (res.collectId == null) {
            this.blogs[indexOf].collect = null
            this.blogs[indexOf].collectCount--
          } else {
            this.blogs[indexOf].collect = res
            this.blogs[indexOf].collectCount++
          }
        }
      )
    },
    changeLike(blog) {
      let id = ''
      if (blog.like != null) {
        id = blog.like.likeId
      }
      Like.createOrUpdate(blog.blogId, id).then(
        res => {
          const indexOf = this.blogs.indexOf(blog)
          if (res.likeId == null) {
            this.blogs[indexOf].like = null
            this.blogs[indexOf].likeCount--
          } else {
            this.blogs[indexOf].like = res
            this.blogs[indexOf].likeCount++
          }
        }
      )
    },
    getBlog(page, size) {
      Blog.homeLine(page, size).then(
        res => {
          // console.log(a)
          this.final = res.totalElements
          for (const aElement of res.content) {
            aElement.commentShow = false
            aElement.comments = []
            // console.log(aElement)
            this.blogs.push(aElement)
          }
          // console.log(this.blogs)
          // for (let blog in res.content) {
          //   blog.commentShow = false
          //   this.blogs.push(blog)
          // }
          // console.log(this.blogs)
        }
      )
    },
    load() {
      this.loading = true
      this.page++
      setTimeout(() => {
        this.getBlog(this.page, this.count)
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
    },
    parseImgUrl(imgUrls) {
      return JSON.parse(imgUrls)
    }

  }
}
</script>

<style lang="less" scoped>
.text {
  /*white-space:pre;*/
  white-space: pre-line;
  font-size: 16px;
  line-height: 24px;
}

.item {
  margin-top: 8px;
  margin-bottom: 8px;
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

.blog_under {
  color: #b3b4b6;
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 50px;

  .under_item {
    //float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    cursor: pointer;

    span {
      margin-right: 2px;
    }

    img {
      //margin: auto;
      height: 14px;
      width: 14px;
      margin-right: 2px;
    }
  }

  .under_item_active {
    //float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    color: #20a0ff;
    cursor: pointer;

    img {
      height: 14px;
      width: 14px;
      margin-right: 2px;
    }
  }

}

.blockDiv {
  width: 420px;
  display: flex;
  flex-wrap: wrap;

  .block {
    width: calc(calc(420px / 3) - 10px);
    margin: 5px;
    height: calc(calc(420px / 3) - 10px);
    box-sizing: border-box;
    //border:1px  solid #000;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    display: flex;

    .el-image {
      width: 100%;
    }
  }
}

</style>
