<!-- 组件说明: 博客 -->
<template>
  <div>
    <el-dialog
      title="用户登录"
      :visible.sync="dialogVisible"
      width="40%"
      center
      @close="dialogClose"
    >
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            show-password
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            :loading="showLoading"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLoading: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show
      },
      set(val) {
        return val
      }
    }
  },
  created() {
    this.loginTest()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.showLoading = true
          this.login(this.loginForm.username, this.loginForm.password)
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    dialogClose() {
      this.$emit('close')
    },
    login(username, password) {
      this.$http
        .post('/user/login', { username: username, password: password })
        .then((data) => {
          this.showLoading = false
          sessionStorage.setItem('username', data.username)
          this.$emit('close')
          this.loginTest()
          this.$router.push({
            path: 'blog/list'
          })
        })
        .catch((err) => {
          this.$message.error(err)
          this.showLoading = false
        })
    },
    loginTest() {
      this.$http.get('/user/loginTest').then((res) => {
        console.log('loginTest', res)
      })
    }
  }
}
</script>

<style scoped></style>
