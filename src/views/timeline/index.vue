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
          <el-timeline-item v-for="i in count" :timestamp="diaryList[i-1].dayTimestamp" placement="top">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :name="diaryList[i-1].id+1" :title="diaryList[i-1].guide1">
                <div>{{ diaryList[i - 1].content1 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diaryList[i-1].id+2" :title="diaryList[i-1].guide2">
                <div>{{ diaryList[i - 1].content2 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diaryList[i-1].id+3" :title="diaryList[i-1].guide3">
                <div>{{ diaryList[i - 1].content3 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diaryList[i-1].id+4" :title="diaryList[i-1].guide4">
                <div>{{ diaryList[i - 1].content4 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diaryList[i-1].id+5" :title="diaryList[i-1].guide5">
                <div>{{ diaryList[i - 1].content5 }}</div>
              </el-collapse-item>
              <el-collapse-item :name="diaryList[i-1].id+6" :title="diaryList[i-1].guide6">
                <div>{{ diaryList[i - 1].content6 }}</div>
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
      diaryList: undefined,
      page: 0,
      count: 10,
      loading: false,
      final: 20
    }
  },
  computed: {
    noMore() {
      return this.count >= this.final
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
    handleChange(val) {
      console.log(val)
    },
    getDiary() {
      Diary.getAllByUser().then(
        res => {
          this.diaryList = res
          console.log(this.diaryList)
        }
      )
    },
    load() {
      this.loading = true
      this.final = this.diaryList.length
      setTimeout(() => {
        this.count += 2
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
