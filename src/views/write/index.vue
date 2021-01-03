<template>

  <div style="margin: 20px">
    <div style="background: #409EFF;height: 100px;margin-bottom: 20px"></div>
    <div>
      <el-row :gutter="15">
        <el-form :model="formData" :rules="rules" label-position="top" label-width="100px" ref="elForm"
                 size="medium">
          <el-col :span="24">
            <el-form-item label="日期选择" prop="field1">
              <el-date-picker :style="{width: '100%'}" clearable format="yyyy-MM-dd"
                              placeholder="请选择日期选择" v-model="formData.field1"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多行文本" label-width="-1px" prop="field112">
              <el-input :autosize="{minRows: 8, maxRows: 8}" :style="{width: '100%'}" placeholder="多行文本"
                        type="textarea" v-model="formData.field112"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多行文本" label-width="-1px" prop="field118">
              <el-input :autosize="{minRows: 8, maxRows: 8}" :style="{width: '100%'}" placeholder="多行文本"
                        type="textarea" v-model="formData.field118"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多行文本" label-width="-1px" prop="field119">
              <el-input :autosize="{minRows: 8, maxRows: 8}" :style="{width: '100%'}" placeholder="多行文本"
                        type="textarea" v-model="formData.field119"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多行文本" label-width="-1px" prop="field120">
              <el-input :autosize="{minRows: 8, maxRows: 8}" :style="{width: '100%'}" placeholder="多行文本"
                        type="textarea" v-model="formData.field120"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多行文本" label-width="-1px" prop="field121">
              <el-input :autosize="{minRows: 8, maxRows: 8}" :style="{width: '100%'}" placeholder="多行文本"
                        type="textarea" v-model="formData.field121"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多行文本" label-width="-1px" prop="field122">
              <el-input :autosize="{minRows: 8, maxRows: 8}" :style="{width: '100%'}" placeholder="多行文本"
                        type="textarea" v-model="formData.field122"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button @click="submitForm" type="primary">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div>
      <!--      <el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>-->
      <div style="width: 100%">
        <div @click="dialog=true" style="width: 100px;height: 100px;background: #409EFF">

        </div>
        <div @click="dialog=true" style="width: 100px;height: 100px;background: #409EFF"></div>
        <div @click="dialog=true" style="width: 100px;height: 100px;background: #409EFF"></div>
        <div @click="dialog=true" style="width: 100px;height: 100px;background: #409EFF"></div>
        <div @click="dialog=true" style="width: 100px;height: 100px;background: #409EFF"></div>
        <div @click="dialog=true" style="width: 100px;height: 100px;background: #409EFF"></div>

      </div>
      <el-drawer
        :before-close="handleClose"
        :visible.sync="dialog"
        custom-class="demo-drawer"
        direction="ltr"
        ref="drawer"
        size="100%"
        title="我嵌套了 Form !"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item :label-width="formLabelWidth" label="活动名称">
              <el-input autocomplete="off" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="活动区域">
              <el-select placeholder="请选择活动区域" v-model="form.region">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button :loading="loading" @click="$refs.drawer.closeDrawer()" type="primary">{{ loading ? '提交中 ...' :
              '确定' }}
            </el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
  export default {

    name: 'Write',
    components: {},
    props: [],
    data() {
      return {
        truee: true,
        table: false,
        dialog: false,
        loading: false,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px',
        timer: null,

        formData: {
          field1: null,
          field112: undefined,
          field118: undefined,
          field119: undefined,
          field120: undefined,
          field121: undefined,
          field122: undefined
        },
        rules: {
          field1: [],
          field112: [],
          field118: [],
          field119: [],
          field120: [],
          field121: [],
          field122: []
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
      submitForm() {
        this.$refs['elForm'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
        })
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
      },

      handleClose(done) {
        if (this.loading) {
          return
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true
            this.timer = setTimeout(() => {
              done()
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false
              }, 400)
            }, 2000)
          })
          .catch(_ => {
          })
      },
      cancelForm() {
        this.loading = false
        this.dialog = false
        clearTimeout(this.timer)
      }
    }
  }

</script>
<style>
</style>
