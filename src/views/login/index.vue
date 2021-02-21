<template>
  <div v-if="isLogin" class="login">
    <el-form

      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
      label-width="0px"
    >
      <h1 class="title">
        格 子 日 志
      </h1>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" auto-complete="off" placeholder="邮箱号" type="text">
          <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="user"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
          type="password"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="password"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="validCode"/>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          style="width:100%;"
          type="primary"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <div class="change-text">还没有账号？<span @click="goRegister">去注册</span></div>

    </el-form>

  </div>
  <div v-else class="login">

    <el-row :gutter="15">
      <h1 class="title">
        注册
      </h1>
      <el-form
        ref="registerFrom"
        :model="registerFormData"
        :rules="registerRules"
        class="login-form"
        label-width="100px"
        size="medium"
      >
        <el-col :span="24">
          <el-form-item label="" label-width="-1px" prop="email">
            <el-input
              v-model="registerFormData.email"
              :style="{width: '100%'}"
              clearable
              placeholder="请输入注册邮箱"
              prefix-icon="el-icon-message"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" label-width="-1px" prop="nickname">
            <el-input
              v-model="registerFormData.nickname"
              :style="{width: '100%'}"
              clearable
              placeholder="昵称"
              prefix-icon="el-icon-user"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" label-width="-1px" prop="password">
            <el-input
              v-model="registerFormData.password"
              :style="{width: '100%'}"
              clearable
              placeholder="密码"
              prefix-icon="el-icon-lock"
              show-password
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" label-width="-1px" prop="password_again">
            <el-input
              v-model="registerFormData.password_again"
              :style="{width: '100%'}"
              clearable
              placeholder="请再次输入密码"
              prefix-icon="el-icon-lock"
              show-password
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="" label-width="-1px" prop="activeCode">
            <el-input
              v-model="registerFormData.activeCode"
              :maxlength="128"
              :style="{width: '100%'}"
              clearable
              placeholder="验证码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="" label-width="-1px" prop="sendActiveCode">
            <el-button v-if="firstSend===0" :plain="true" size="medium" style="float: right" type="primary"
                       @click="getActiveCode(registerFormData)"
            > 发送验证码
            </el-button>
            <el-button v-else-if="firstSend!==0&&count>0" :plain="true" disabled size="medium" style="float: right"
                       type="primary"
            >
              {{ count }}s
            </el-button>
            <el-button v-else-if="firstSend!==0&&count===0" :plain="true" size="medium" style="float: right"
                       type="primary" @click="reSendActiveCode(registerFormData.email)"
            >
              重发验证码
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" label-width="-1px">
            <el-button style="width: 100%" type="primary"
                       @click="enable(registerFormData.email,registerFormData.activeCode)"
            >立即注册
            </el-button>
          </el-form-item>
        </el-col>
        <div class="change-text">已有账号？<span @click="goRegister">去登录</span></div>

      </el-form>
    </el-row>
  </div>
</template>

<script>
import { encrypt } from '@/utils/rsaEncrypt'
import Config from '@/settings'
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import activeCode from '@/api/blog/activeCode'

export default {
  name: 'Login',
  data() {
    return {
      count: 0,
      firstSend: 0,
      registerFormData: {
        email: '',
        nickname: '',
        password: '',
        password_again: '',
        activeCode: ''

      },
      registerRules: {
        email: [{
          required: true,
          message: '请输入注册邮箱',
          trigger: 'blur'
        }, {
          pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
          message: '邮箱格式错误',
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '昵称',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码',
          trigger: 'blur'
        }],
        password_again: [{
          required: true,
          message: '请再次输入密码',
          trigger: 'blur'
        }],
        activeCode: [{
          required: false,
          message: '验证码',
          trigger: 'blur'
        }]
      },

      isLogin: true,
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // 获取验证码
    this.getCode()
    // 获取用户名密码等Cookie
    this.getCookie()
    // token 过期提示
    this.point()
  },
  methods: {
    enable(email, code) {
      activeCode.enable(email, code).then(
        res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      )
    },
    reSendActiveCode(email) {
      activeCode.reSendActiveCode(email).then(
        res => {
          if (res.code === 301) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else if (res.code === 0) {
            this.$message({
              message: '验证码已发送至' + res.msg,
              type: 'success'
            })
          }
        }
      )
      this.getCodeCount()
    },
    getActiveCode(data) {
      this.$refs['registerFrom'].validate(valid => {
        if (!valid) return
        if (data.password !== data.password_again) {
          this.$message({
            message: '两次密码不一致',
            type: 'warning'
          })
          return
        }
        data.password = encrypt(data.password)
        data.password_again = encrypt(data.password_again)
        activeCode.getActiveCode(data).then(
          res => {
            if (res.code === 301) {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            } else if (res.code === 0) {
              this.$message({
                message: '验证码已发送至' + res.msg,
                type: 'success'
              })
            }
          }
        )
        this.firstSend++
        this.getCodeCount()
        // data.password = decrypt(data.password)
        // data.password_again = decrypt(data.password_again)
      })
    },
    submitForm() {
      if (!this.registerFormData.password === this.registerFormData.password_again) {
        this.$message({
          message: '两次密码不一致',
          type: 'warning'
        })
        return
      }
      this.$refs['registerFrom'].validate(valid => {
        if (!valid) return
        activeCode.getActiveCode(this.registerFormData).then(
          res => {
            console.log(res)
          }
        )
      })
    },
    // resetForm() {
    //   this.$refs['registerFrom'].resetFields()
    // },
    goRegister() {
      this.isLogin = !this.isLogin
    },
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = res.img
        this.loginForm.uuid = res.uuid
      })
    },
    getCodeCount() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password)
        }
        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store.dispatch('Login', user).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            this.getCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    point() {
      const point = Cookies.get('point') !== undefined
      if (point) {
        this.$notify({
          title: '提示',
          message: '当前登录状态已过期，请重新登录！',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
  }

  .title {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;

    .el-input {
      height: 38px;

      input {
        height: 38px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }

  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle
    }
  }

  .change-text {
    text-align: right;

    span {
      color: #1482f0;
      cursor: pointer;
    }
  }

</style>
