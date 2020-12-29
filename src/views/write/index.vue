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

  </div>
</template>
<script>
  export default {
    name: 'Write',
    components: {},
    props: [],
    data() {
      return {
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
      }
    }
  }

</script>
<style>
</style>
