<template>
  <div style="margin: 20px">
    <div style="background: #409EFF;height: 100px;margin-bottom: 20px"/>
    <div>
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          label-position="top"
          label-width="100px"
          size="medium"
        >
          <el-col :span="24">
            <el-form-item label="日期选择" prop="field1">
              <el-date-picker
                v-model="formData.field1"
                :style="{width: '100%'}"
                clearable
                format="yyyy-MM-dd"
                placeholder="请选择日期选择"
                value-format="yyyy-MM-dd"
                @change="dateChange"
              />
            </el-form-item>
          </el-col>
          <div style="width: 100%;height: 900px;display: inline-block;padding: 10px">
            <div style="width: 100%;display: flex;justify-content: center">
              <div @click="openContent(1)" class="diary-card">
                <div style="margin: 15px">{{ formData.field001 }}</div>
              </div>
              <div @click="openContent(2)" class="diary-card">
                <div style="margin: 15px">{{ formData.field002 }}</div>
              </div>
            </div>
            <div style="width: 100%;display: flex;justify-content: center">
              <div @click="openContent(3)" class="diary-card">
                <div style="margin: 15px">{{ formData.field003 }}</div>
              </div>
              <div @click="openContent(4)" class="diary-card">
                <div style="margin: 15px">{{ formData.field004 }}</div>
              </div>
            </div>
            <div style="width: 100%;display: flex;justify-content: center">
              <div @click="openContent(5)" class="diary-card">
                <div style="margin: 15px">{{ formData.field005 }}</div>
              </div>
              <div @click="openContent(6)" class="diary-card">
                <div style="margin: 15px">{{ formData.field006 }}</div>
              </div>
            </div>

          </div>
        </el-form>
      </el-row>
    </div>
    <!-- Form -->
    <!--    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

    <el-dialog :visible.sync="dialogFormVisible" title="日记内容">
      <el-form
        ref="elForm"
        :model="fadeFormData"
        :rules="fadeRules"
        label-position="top"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="多行文本" label-width="-1px" prop="field101">
          <el-input
            v-model="fadeFormData.field101"
            :autosize="{minRows: 8, maxRows: 8}"
            :maxlength="5000"
            :style="{width: '100%'}"
            placeholder="请输入多行文本"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="图片" prop="field201">

          <el-upload
            :auto-upload="false"
            :limit="1"
            :multiple="true"
            :on-exceed="overLimit"
            accept="image/*"
            action="#"
            list-type="picture-card"
          >
            <i class="el-icon-plus" slot="default"/>
            <div slot="file" slot-scope="{file}">
              <img
                :src="file.url"
                alt=""
                class="el-upload-list__item-thumbnail"
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"/>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"/>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"/>
                </span>
              </span>
            </div>
            <!--            <i class="el-icon-plus" />-->
            <div class="el-upload__tip" slot="tip">只能上传1张不超过 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button @click="uploadFrom()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Diary from '@/api/blog/diary'
  import user from '@/store/modules/user'

  export default {
    name: 'Write',
    components: {},
    props: [],
    data() {
      return {
        diary: {
          content1: undefined,
          content2: undefined,
          content3: undefined,
          content4: undefined,
          content5: undefined,
          content6: undefined,
          createdDate: undefined,
          dayTimestamp: undefined,
          guide1: undefined,
          guide2: undefined,
          guide3: undefined,
          guide4: undefined,
          guide5: undefined,
          guide6: undefined,
          id: undefined,
          mood: undefined,
          period: undefined,
          tag: undefined,
          updatedDate: undefined,
          userId: undefined
        },
        diaryContentIndex: undefined,
        privateState: {},
        sharedState: user.state,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        fadeFormData: {
          field101: undefined,
          field201: null
        },
        fadeRules: {
          field001: [],
          field101: []
        },
        field201Action: 'https://jsonplaceholder.typicode.com/posts/',
        field201fileList: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        formData: {
          field1: new Date(),
          field001: 1,
          field002: 2,
          field003: 3,
          field004: 4,
          field005: 5,
          field006: 6
        },
        rules: {
          field1: [],
          field001: [],
          field002: [],
          field003: [],
          field004: [],
          field005: [],
          field006: []
        }
      }
    },
    computed: {},
    watch: {},
    created() {
      this.getDiary()
    },
    mounted() {
    },
    methods: {
      openContent(index) {
        this.diaryContentIndex = index
        this.dialogFormVisible = true
      },
      uploadFrom() {
        if (this.diary.id === null) {
          console.log('xinjian')
          console.log(this.diary)
          switch (this.diaryContentIndex) {
            case 1:
              this.diary.content1 = this.fadeFormData.field101
              this.createDiary()
              break
            case 2:
              this.diary.content2 = this.fadeFormData.field101
              this.createDiary()
              break
            case 3:
              this.diary.content3 = this.fadeFormData.field101
              this.createDiary()
              break
            case 4:
              this.diary.content4 = this.fadeFormData.field101
              this.createDiary()
              break
            case 5:
              this.diary.content5 = this.fadeFormData.field101
              this.createDiary()
            break
          case 6:
            this.diary.content6 = this.fadeFormData.field101
            this.createDiary()
            break
        }
      } else {
          console.log(this.diary)
          switch (this.diaryContentIndex) {
            case 1:
              this.diary.content1 = this.fadeFormData.field101
              this.updateDiary()
              break
            case 2:
              this.diary.content2 = this.fadeFormData.field101
              this.updateDiary()
              break
            case 3:
              this.diary.content3 = this.fadeFormData.field101
              this.updateDiary()
              break
            case 4:
              this.diary.content4 = this.fadeFormData.field101
              this.updateDiary()
              break
            case 5:
              this.diary.content5 = this.fadeFormData.field101
              this.updateDiary()
              break
            case 6:
              this.diary.content6 = this.fadeFormData.field101
              this.updateDiary()
              break
          }
          this.fadeFormData.field101 = undefined
          this.dialogFormVisible = false
        }
    },
    createDiary() {
      this.diary.period = 'daily'
      this.diary.dayTimestamp = this.formData.field1
      console.log(this.formData.field1)
      Diary.add(this.diary).then(res => {
        this.diary = res
      })
    },
    updateDiary() {
      this.diary.dayTimestamp = this.formData.field1
      Diary.edit(this.diary).then(res => {
        // this.diary = res
      })
    },
    cancelForm() {
      this.dialogFormVisible = false
      this.diaryContentIndex = undefined
    },
    getDiary(date1) {
      if (date1 === undefined) {
        const date = new Date()
        const year = date.getFullYear()
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

        // 拼接
        date1 = year + '-' + month + '-' + day
        this.formData.field1 = date1
      }
      Diary.findOne(date1).then(
        res => {
          this.formData.field001 = res.guide1
          this.formData.field002 = res.guide2
          this.formData.field003 = res.guide3
          this.formData.field004 = res.guide4
          this.formData.field005 = res.guide5
          this.formData.field006 = res.guide6
          this.diary = res
        }
      )
    },
    dateChange() {
      this.getDiary(this.formData.field1)
    },
    field201BeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    overLimit() {
      alert('over Limit')
    }
  }
}

</script>
<style>
  .el-upload__tip {
    line-height: 1.2;
  }

  .diary-card {
    width: 50%;
    height: 300px;
    border: solid #f0f2f1;
    color: #b3b4b6;
    font-size: 14px;
    font-weight: 800;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>

