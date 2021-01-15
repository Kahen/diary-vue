<template>
  <div class="block" style="margin: 20px">

    <div style="width: 100%;margin: 20px">
      <div class="infinite-list-wrapper" style="overflow:auto;height: 1200px;">
        <el-timeline>
          <!--          <ul-->
          <!--            v-infinite-scroll="load"-->
          <!--            class="list"-->
          <!--            infinite-scroll-disabled="disabled"-->
          <!--            style="width: 100%;"-->
          <!--          >-->
          <!--            <li v-for="i in count" class="list-item" style="width: 100%;padding: 0 20px 20px 20px">-->
          <el-timeline-item placement="top" timestamp="2018/4/12" v-for="i in count">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <!--            </li>-->
          <!--          </ul>-->
          <p style="text-align: center" v-if="loading">加载中...</p>
          <p style="text-align: center" v-if="noMore">没有更多了</p>
          <!--      <el-timeline-item placement="top" timestamp="2018/4/12">-->
          <!--        <el-card>-->
          <!--          <h4>更新 Github 模板</h4>-->
          <!--          <p>王小虎 提交于 2018/4/12 20:46</p>-->
          <!--        </el-card>-->
          <!--      </el-timeline-item>-->
          <!--    <el-timeline-item placement="top" timestamp="2018/4/3">-->
          <!--      <el-card>-->
          <!--        <h4>更新 Github 模板</h4>-->
          <!--        <p>王小虎 提交于 2018/4/3 20:46</p>-->
          <!--      </el-card>-->
          <!--    </el-timeline-item>-->
          <!--    <el-timeline-item placement="top" timestamp="2018/4/2">-->
          <!--      <el-card>-->
          <!--        <h4>更新 Github 模板</h4>-->
          <!--        <p>王小虎 提交于 2018/4/2 20:46</p>-->
          <!--      </el-card>-->
          <!--    </el-timeline-item>-->
        </el-timeline>
      </div>
    </div>


  </div>
</template>

<script>
  import Diary from '@/api/blog/diary'

  export default {
    name: 'TimeLine',
    components: {},
    props: [],
    data() {
      return {
        diaryList: undefined,
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
    watch: {},
    created() {
      this.getDiary()
    },
    mounted() {
    },
    methods: {
      getDiary() {
        Diary.getAllByUser().then(
          res => {
            // console.log(res)
            this.diary = res
            console.log(this.diary)
          }
        )
      },
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

  li {

  }

  .item {
    margin-bottom: 18px;
  }

  /*.clearfix:before,*/
  /*.clearfix:after {*/
  /*  display: table;*/
  /*  content: "";*/
  /*}*/

  /*.clearfix:after {*/
  /*  clear: both*/
  /*}*/

  /*.box-card {*/
  /*  width: 480px;*/
  /*}*/

  .infinite-list-wrapper::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
</style>
