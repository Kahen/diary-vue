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
              <div @click="dialogFormVisible = true" style="width: 50%;height: 300px;background: #20a0ff">{{
                formData.field001 }}
              </div>
              <div @click="dialogFormVisible = true" style="width: 50%;height: 300px;background: #6c5fe0">{{
                formData.field002 }}
              </div>
            </div>
            <div style="width: 100%;display: flex;justify-content: center">
              <div @click="dialogFormVisible = true" style="width: 50%;height: 300px;background: #55b11c">{{
                formData.field003 }}
              </div>
              <div @click="dialogFormVisible = true" style="width: 50%;height: 300px;background: #f5be0f">{{
                formData.field004 }}
              </div>
            </div>
            <div style="width: 100%;display: flex;justify-content: center">
              <div @click="dialogFormVisible = true" style="width: 50%;height: 300px;background: #20a0ff">{{
                formData.field005 }}
              </div>
              <div @click="dialogFormVisible = true" style="width: 50%;height: 300px;background: #ff0303">{{
                formData.field006 }}
              </div>
            </div>
          </div>
          <!--          <el-col :span="12">
                      <el-form-item label="多行文本" label-width="-1px" prop="field112">
                        <el-input
                          v-model="formData.field112"
                          :autosize="{minRows: 8, maxRows: 8}"
                          :style="{width: '100%'}"
                          placeholder="多行文本"
                          type="textarea"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="多行文本" label-width="-1px" prop="field118">
                        <el-input
                          v-model="formData.field118"
                          :autosize="{minRows: 8, maxRows: 8}"
                          :style="{width: '100%'}"
                          placeholder="多行文本"
                          type="textarea"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="多行文本" label-width="-1px" prop="field119">
                        <el-input
                          v-model="formData.field119"
                          :autosize="{minRows: 8, maxRows: 8}"
                          :style="{width: '100%'}"
                          placeholder="多行文本"
                          type="textarea"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="多行文本" label-width="-1px" prop="field120">
                        <el-input
                          v-model="formData.field120"
                          :autosize="{minRows: 8, maxRows: 8}"
                          :style="{width: '100%'}"
                          placeholder="多行文本"
                          type="textarea"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="多行文本" label-width="-1px" prop="field121">
                        <el-input
                          v-model="formData.field121"
                          :autosize="{minRows: 8, maxRows: 8}"
                          :style="{width: '100%'}"
                          placeholder="多行文本"
                          type="textarea"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="多行文本" label-width="-1px" prop="field122">
                        <el-input
                          v-model="formData.field122"
                          :autosize="{minRows: 8, maxRows: 8}"
                          :style="{width: '100%'}"
                          placeholder="多行文本"
                          type="textarea"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item size="large">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button @click="resetForm">重置</el-button>
                      </el-form-item>
                    </el-col>-->
        </el-form>
      </el-row>
    </div>
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

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
            :limit="9"
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
            <div class="el-upload__tip" slot="tip">只能上传不超过 9张 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Write',
  components: {},
  props: [],
  data() {
    return {
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
  },
  mounted() {
  },
  methods: {
    dateChange() {
      console.log(this.formData.field1)
      this.formData.field001 = this.formData.field1
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
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
</style>

