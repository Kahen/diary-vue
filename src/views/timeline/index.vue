<template>
  <div class="block" style="margin: 20px">

    <div style="width: 100%;margin: 20px">
      <div class="infinite-list-wrapper" style="overflow:auto;height: 1200px;">
        <el-timeline
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <!--          <ul-->
          <!--            v-infinite-scroll="load"-->
          <!--            class="list"-->
          <!--            infinite-scroll-disabled="disabled"-->
          <!--            style="width: 100%;"-->
          <!--          >-->
          <!--            <li v-for="i in count" class="list-item" style="width: 100%;padding: 0 20px 20px 20px">-->
          <el-timeline-item v-for="diary in diaryList" :key="diary.id" :timestamp="diary.dayTimestamp" placement="top">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :name="diary.id+1" :title="diary.guide1">
                <div>{{ diary.content1 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diary.id+2" :title="diary.guide2">
                <div>{{ diary.content2 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diary.id+3" :title="diary.guide3">
                <div>{{ diary.content3 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diary.id+4" :title="diary.guide4">
                <div>{{ diary.content4 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diary.id+5" :title="diary.guide5">
                <div>{{ diary.content5 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diary.id+6" :title="diary.guide6">
                <div>{{ diary.content6 }}</div>
              </el-collapse-item>
            </el-collapse>
          </el-timeline-item>
          <!--            </li>-->
          <!--          </ul>-->
          <p v-if="loading" style="text-align: center">加载中...</p>
          <p v-if="noMore" style="text-align: center">没有更多了</p>

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
      activeNames: [],
      diaryList: [],
      page: 0,
      count: 10,
      loading: false,
      final: 2
    }
  },
  computed: {
    noMore() {
      return this.diaryList.length >= this.final
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {},
  created() {
    this.getDiary(0)
  },
  mounted() {
  },
  methods: {
    handleChange(val) {
      // console.log(val)
    },
    getDiary(page) {
      Diary.getAllByUser(page, this.count).then(
        res => {
          // console.log(res)
          this.diaryList = this.diaryList.concat(res.content)
          this.final = res.totalElements
        }
      )
    },
    load() {
      this.loading = true
      this.page++
      setTimeout(() => {
        this.getDiary(this.page)
        this.loading = false
      }, 1000)
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
