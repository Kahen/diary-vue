<template>
  <div style="margin: 20px">
    <!--    <div style="background: #409EFF;height: 100px;margin-bottom: 20px" />-->
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
            <el-form-item label="写下点什么..." prop="field1">
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
          <!--          <div>-->
          <!--            mood: {{ this.diary.mood }}-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            tag:{{ this.diary.tag }}-->
          <!--          </div>-->
          <div style="width: 100%;height: 900px;display: inline-block;padding: 10px">
            <div style="width: 100%;display: flex;justify-content: center">
              <div class="diary-card">
                <div class="card_content" @click="openContent(1)">{{ formData.field001 }}<p>{{
                    this.diary.content1
                  }}</p>

                </div>
                <el-image
                  :preview-src-list="[baseApi + '/file/' + tempImg1.type + '/' + tempImg1.realName]"
                  :src=" baseApi + '/file/' + tempImg1.type + '/' + tempImg1.realName"
                  class="el-avatar"
                  fit="contain"
                  lazy
                  style="border-radius: 100%;margin-left: 15px"
                >
                  <div slot="error">
                    <i class="el-icon-document"/>
                  </div>
                </el-image>
              </div>
              <div class="diary-card">
                <div class="card_content" @click="openContent(2)">{{ formData.field002 }}<p>{{
                    this.diary.content2
                  }}</p>

                </div>
                <el-image
                  :preview-src-list="[baseApi + '/file/' + tempImg2.type + '/' + tempImg2.realName]"
                  :src=" baseApi + '/file/' + tempImg2.type + '/' + tempImg2.realName"
                  class="el-avatar"
                  fit="contain"
                  lazy
                  style="border-radius: 100%;margin-left: 15px"
                >
                  <div slot="error">
                    <i class="el-icon-document"/>
                  </div>
                </el-image>
              </div>
            </div>
            <div style="width: 100%;display: flex;justify-content: center">
              <div class="diary-card">
                <div class="card_content" @click="openContent(3)">{{ formData.field003 }}<p>{{
                    this.diary.content3
                  }}</p>

                </div>
                <el-image
                  :preview-src-list="[baseApi + '/file/' + tempImg3.type + '/' + tempImg3.realName]"
                  :src=" baseApi + '/file/' + tempImg3.type + '/' + tempImg3.realName"
                  class="el-avatar"
                  fit="contain"
                  lazy
                  style="border-radius: 100%;margin-left: 15px"
                >
                  <div slot="error">
                    <i class="el-icon-document"/>
                  </div>
                </el-image>
              </div>
              <div class="diary-card">
                <div class="card_content" @click="openContent(4)">{{ formData.field004 }}<p>{{
                    this.diary.content4
                  }}</p>

                </div>
                <el-image
                  :preview-src-list="[baseApi + '/file/' + tempImg4.type + '/' + tempImg4.realName]"
                  :src=" baseApi + '/file/' + tempImg4.type + '/' + tempImg4.realName"
                  class="el-avatar"
                  fit="contain"
                  lazy
                  style="border-radius: 100%;margin-left: 15px"
                >
                  <div slot="error">
                    <i class="el-icon-document"/>
                  </div>
                </el-image>
              </div>
            </div>
            <div style="width: 100%;display: flex;justify-content: center">
              <div class="diary-card">
                <div class="card_content" @click="openContent(5)">{{ formData.field005 }}<p>{{
                    this.diary.content5
                  }}</p>

                </div>
                <el-image
                  :preview-src-list="[baseApi + '/file/' + tempImg5.type + '/' + tempImg5.realName]"
                  :src=" baseApi + '/file/' + tempImg5.type + '/' + tempImg5.realName"
                  class="el-avatar"
                  fit="scale-down"
                  lazy

                  style="border-radius: 100%;margin-left: 15px"
                >
                  <div slot="error">
                    <i class="el-icon-document"/>
                  </div>
                </el-image>
              </div>
              <div class="diary-card">
                <div class="card_content" @click="openContent(6)">{{ formData.field006 }}<p>{{
                    this.diary.content6
                  }}</p>

                </div>
                <el-image
                  :preview-src-list="[baseApi + '/file/' + tempImg6.type + '/' + tempImg6.realName]"
                  :src=" baseApi + '/file/' + tempImg6.type + '/' + tempImg6.realName"
                  class="el-avatar"
                  fit="contain"
                  lazy
                  style="border-radius: 100%;margin-left: 15px"
                >
                  <div slot="error">
                    <i class="el-icon-document"/>
                  </div>
                </el-image>
              </div>
            </div>

          </div>
        </el-form>
      </el-row>
    </div>
    <!-- Form -->
    <!--    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

    <el-dialog :visible.sync="dialogFormVisible1" title="日记内容">
      <el-form
        ref="elForm"
        :model="fadeFormData1"
        :rules="fadeRules"
        label-position="top"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="多行文本" label-width="-1px" prop="field101">
          <el-input
            v-model="fadeFormData1.field101"
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
            :action="imagesUploadApi"
            :auto-upload="true"
            :headers="headers"
            :limit="1"
            :multiple="true"
            :on-error="handleError"
            :on-exceed="overLimit"
            :on-success="handleSuccess"
            accept="image/*"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"/>
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
            <div slot="tip" class="el-upload__tip">只能上传1张不超过 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="uploadFrom()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" title="日记内容">
      <el-form
        ref="elForm"
        :model="fadeFormData2"
        :rules="fadeRules"
        label-position="top"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="多行文本" label-width="-1px" prop="field101">
          <el-input
            v-model="fadeFormData2.field101"
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
            :action="imagesUploadApi"
            :limit="1"
            :multiple="true"
            :on-exceed="overLimit"
            :auto-upload="true"
            :headers="headers"
            :on-error="handleError"
            accept="image/*"
            :on-success="handleSuccess"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"/>
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
            <div slot="tip" class="el-upload__tip">只能上传1张不超过 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="uploadFrom()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible3" title="日记内容">
      <el-form
        ref="elForm"
        :model="fadeFormData3"
        :rules="fadeRules"
        label-position="top"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="多行文本" label-width="-1px" prop="field101">
          <el-input
            v-model="fadeFormData3.field101"
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
            :action="imagesUploadApi"
            :auto-upload="true"
            :headers="headers"
            :limit="1"
            :multiple="true"
            :on-error="handleError"
            :on-exceed="overLimit"
            :on-success="handleSuccess"
            accept="image/*"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"/>
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
            <div slot="tip" class="el-upload__tip">只能上传1张不超过 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="uploadFrom()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible4" title="日记内容">
      <el-form
        ref="elForm"
        :model="fadeFormData4"
        :rules="fadeRules"
        label-position="top"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="多行文本" label-width="-1px" prop="field101">
          <el-input
            v-model="fadeFormData4.field101"
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
            :action="imagesUploadApi"
            :auto-upload="true"
            :headers="headers"
            :limit="1"
            :multiple="true"
            :on-error="handleError"
            :on-exceed="overLimit"
            :on-success="handleSuccess"
            accept="image/*"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"/>
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
            <div slot="tip" class="el-upload__tip">只能上传1张不超过 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="uploadFrom()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible5" title="日记内容">
      <el-form
        ref="elForm"
        :model="fadeFormData5"
        :rules="fadeRules"
        label-position="top"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="多行文本" label-width="-1px" prop="field101">
          <el-input
            v-model="fadeFormData5.field101"
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
            :action="imagesUploadApi"
            :auto-upload="true"
            :headers="headers"
            :limit="1"
            :multiple="true"
            :on-error="handleError"
            :on-exceed="overLimit"
            :on-success="handleSuccess"
            accept="image/*"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"/>
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
            <div slot="tip" class="el-upload__tip">只能上传1张不超过 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="uploadFrom()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible6" title="日记内容">
      <el-form
        ref="elForm"
        :model="fadeFormData6"
        :rules="fadeRules"
        label-position="top"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="多行文本" label-width="-1px" prop="field101">
          <el-input
            v-model="fadeFormData6.field101"
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
            :action="imagesUploadApi"
            :auto-upload="true"
            :headers="headers"
            :limit="1"
            :multiple="true"
            :on-error="handleError"
            :on-exceed="overLimit"
            :on-success="handleSuccess"
            accept="image/*"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"/>
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
            <div slot="tip" class="el-upload__tip">只能上传1张不超过 2MB 的image/*文件</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="uploadFrom()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Diary from '@/api/blog/diary'
import user from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import Img from '@/api/blog/img'

export default {
  name: 'Write',
  components: {},
  props: [],
  data() {
    return {
      tempImg1: {
        createBy: 'admin',
        createTime: 1610895992000,
        id: 18,
        name: 'Snipaste_2021',
        realName: 'transparent.png',
        size: undefined,
        suffix: 'png',
        type: '图片',
        updateTime: 1610895992000,
        updatedBy: 'admin'
      },
      tempImg2: {
        createBy: 'admin',
        createTime: 1610895992000,
        id: 18,
        name: 'Snipaste_2021',
        realName: 'transparent.png',
        size: undefined,
        suffix: 'png',
        type: '图片',
        updateTime: 1610895992000,
        updatedBy: 'admin'
      },
      tempImg3: {
        createBy: 'admin',
        createTime: 1610895992000,
        id: 18,
        name: 'Snipaste_2021',
        realName: 'transparent.png',
        size: undefined,
        suffix: 'png',
        type: '图片',
        updateTime: 1610895992000,
        updatedBy: 'admin'
      },
      tempImg4: {
        createBy: 'admin',
        createTime: 1610895992000,
        id: 18,
        name: 'Snipaste_2021',
        realName: 'transparent.png',
        size: undefined,
        suffix: 'png',
        type: '图片',
        updateTime: 1610895992000,
        updatedBy: 'admin'
      },
      tempImg5: {
        createBy: 'admin',
        createTime: 1610895992000,
        id: 18,
        name: 'Snipaste_2021',
        realName: 'transparent.png',
        size: undefined,
        suffix: 'png',
        type: '图片',
        updateTime: 1610895992000,
        updatedBy: 'admin'
      },
      tempImg6: {
        createBy: 'admin',
        createTime: 1610895992000,
        id: 18,
        name: 'Snipaste_2021',
        realName: 'transparent.png',
        size: undefined,
        suffix: 'png',
        type: '图片',
        updateTime: 1610895992000,
        updatedBy: 'admin'
      },
      headers: { 'Authorization': getToken() },

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
      fadeFormData1: {
        field101: undefined,
        field201: undefined
      },
      fadeFormData2: {
        field101: undefined,
        field201: undefined
      },
      fadeFormData3: {
        field101: undefined,
        field201: undefined
      },
      fadeFormData4: {
        field101: undefined,
        field201: undefined
      },
      fadeFormData5: {
        field101: undefined,
        field201: undefined
      },
      fadeFormData6: {
        field101: undefined,
        field201: undefined
      },
      fadeRules: {
        field001: [],
        field101: []
      },
      field201Action: 'https://jsonplaceholder.typicode.com/posts/',
      field201fileList: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
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
  computed: {
    ...mapGetters([
      'baseApi',
      'fileUploadApi',
      'imagesUploadApi'
    ])
  },
  watch: {},
  created() {
    this.getDiary()
  },
  mounted() {
  },
  methods: {
    openContent(index) {
      this.createDiary()
      switch (index) {
        case 1:
          this.fadeFormData1.field101 = this.diary.content1
          this.dialogFormVisible1 = true
          break
        case 2:
          this.fadeFormData2.field101 = this.diary.content2
          this.dialogFormVisible2 = true
          break
        case 3:
          this.fadeFormData3.field101 = this.diary.content3
          this.dialogFormVisible3 = true
          break
        case 4:
          this.fadeFormData4.field101 = this.diary.content4
          this.dialogFormVisible4 = true
          break
        case 5:
          this.fadeFormData5.field101 = this.diary.content5
          this.dialogFormVisible5 = true
          break
        case 6:
          this.fadeFormData6.field101 = this.diary.content6
          this.dialogFormVisible6 = true
          break
      }

      this.diaryContentIndex = index
    },
    uploadFrom() {
      if (this.diary.id === null) {
        switch (this.diaryContentIndex) {
          case 1:
            this.diary.content1 = this.fadeFormData1.field101
            this.createDiary()
            break
          case 2:
            this.diary.content2 = this.fadeFormData2.field101
            this.createDiary()
            break
          case 3:
            this.diary.content3 = this.fadeFormData3.field101
            this.createDiary()
            break
          case 4:
            this.diary.content4 = this.fadeFormData4.field101
            this.createDiary()
            break
          case 5:
            this.diary.content5 = this.fadeFormData5.field101
            this.createDiary()
            break
          case 6:
            this.diary.content6 = this.fadeFormData6.field101
            this.createDiary()
            break
        }
      } else {
        switch (this.diaryContentIndex) {
          case 1:
            this.diary.content1 = this.fadeFormData1.field101
            this.fadeFormData1.field101 = undefined
            this.updateDiary()
            this.dialogFormVisible1 = false
            break
          case 2:
            this.diary.content2 = this.fadeFormData2.field101
            this.fadeFormData2.field101 = undefined
            this.dialogFormVisible2 = false
            this.updateDiary()
            break
          case 3:
            this.diary.content3 = this.fadeFormData3.field101
            this.fadeFormData3.field101 = undefined
            this.dialogFormVisible3 = false
            this.updateDiary()
            break
          case 4:
            this.diary.content4 = this.fadeFormData4.field101
            this.fadeFormData4.field101 = undefined
            this.dialogFormVisible4 = false
            this.updateDiary()
            break
          case 5:
            this.diary.content5 = this.fadeFormData5.field101
            this.fadeFormData5.field101 = undefined
            this.dialogFormVisible5 = false
            this.updateDiary()
            break
          case 6:
            this.diary.content6 = this.fadeFormData6.field101
            this.fadeFormData6.field101 = undefined
            this.dialogFormVisible6 = false
            this.updateDiary()
            break
        }
      }
    },
    createDiary() {
      this.diary.period = 'daily'
      this.diary.dayTimestamp = this.formData.field1
      console.log(this.formData.field1)
      Diary.add(this.diary).then(res => {
        this.diary = res
      })
      // console.log('create after:' + this.diary)
      // const params = []
      // params.push(
      //   this.tempImg1.realName,
      //   this.tempImg2.realName,
      //   this.tempImg3.realName,
      //   this.tempImg4.realName,
      //   this.tempImg5.realName,
      //   this.tempImg6.realName
      // )
      //
      // Img.add(
      //   {
      //     imgId: undefined,
      //     blogId: this.diary.id,
      //     imgUrl: JSON.stringify(params)
      //   }
      // ).then(
      //   res => {
      //     console.log(res)
      //   }
      // )
    },
    updateDiary() {
      this.diary.dayTimestamp = this.formData.field1
      const blogId = this.diary.id
      Diary.edit(this.diary).then(res => {
        // this.diary = res
      })

      const params = []
      params.push(
        this.tempImg1.realName,
        this.tempImg2.realName,
        this.tempImg3.realName,
        this.tempImg4.realName,
        this.tempImg5.realName,
        this.tempImg6.realName
      )

      Img.add(
        {
          imgId: undefined,
          blogId: blogId,
          imgUrl: JSON.stringify(params)
        }
      ).then(
        res => {
          console.log(res)
        }
      )
    },
    cancelForm() {
      switch (this.diaryContentIndex) {
        case 1:
          this.dialogFormVisible1 = false
          this.diaryContentIndex = undefined
          break
        case 2:
          this.dialogFormVisible2 = false
          this.diaryContentIndex = undefined
          break
        case 3:
          this.dialogFormVisible3 = false
          this.diaryContentIndex = undefined
          break
        case 4:
          this.dialogFormVisible4 = false
          this.diaryContentIndex = undefined
          break
        case 5:
          this.dialogFormVisible5 = false
          this.diaryContentIndex = undefined
          break
        case 6:
          this.dialogFormVisible6 = false
          this.diaryContentIndex = undefined
          break
      }
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
          this.tempImg1.realName = res.imgUrls[0]
          this.tempImg2.realName = res.imgUrls[1]
          this.tempImg3.realName = res.imgUrls[2]
          this.tempImg4.realName = res.imgUrls[3]
          this.tempImg5.realName = res.imgUrls[4]
          this.tempImg6.realName = res.imgUrls[5]
          console.log(this.diary)
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
    },
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      switch (this.diaryContentIndex) {
        case 1:
          this.tempImg1 = response
          break
        case 2:
          this.tempImg2 = response
          break
        case 3:
          this.tempImg3 = response
          break
        case 4:
          this.tempImg4 = response
          break
        case 5:
          this.tempImg5 = response
          break
        case 6:
          this.tempImg6 = response
          break
      }
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

p {
  position: relative;
  line-height: 20px;
  max-height: 180px;
  overflow: hidden;
}

p::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}

.card_content {
  padding: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 240px;
  width: 100%
}
</style>

