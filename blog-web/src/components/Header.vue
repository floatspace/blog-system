<!-- 组件说明: 公共头部 -->
<template>
  <div class="el-row header">
    <el-col :span="10"
      ><h1 class="header-title">{{ username }}的博客</h1></el-col
    >
    <el-col :span="14" class="header-login">
      <template v-if="username === 'FLS'">
        <el-button size="small" plain @click="showDialog = !showDialog"
          >登 录</el-button
        >
        <el-button size="small" plain @click="loginTest">注 册</el-button>
      </template>
      <template v-else>
        <el-button size="small" type="success" plain @click="addBlog"
          >新随笔</el-button
        >
        <el-button size="small" plain @click="loginout">退 出</el-button>
      </template>
    </el-col>
    <login :show="showDialog" @close="closeHandle"></login>
  </div>
</template>

<script>
import Login from 'pages/login/Login'
export default {
  name: '',
  components: {
    Login
  },
  data() {
    return {
      showDialog: false,
      username: 'FLS'
    }
  },
  computed: {},
  mounted() {
    this.initUserInfo()
  },
  methods: {
    addBlog() {
      this.$router.push('/blog/add')
    },
    loginTest() {
      this.$http.get('/user/loginTest').then((res) => {
        console.log('loginTest', res)
      })
    },
    loginout() {
      this.$http.post('/user/loginout', {}).then(() => {
        sessionStorage.removeItem('username')
        this.username = 'FLS'
        this.$router.push('/')
      })
    },
    closeHandle() {
      if (!this.showDialog) {
        return
      }
      this.showDialog = false
      this.initUserInfo()
    },
    initUserInfo() {
      const username = sessionStorage.getItem('username')
      if (username != null) {
        this.username = username
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  .header-title {
    font-size: 24px;
  }
  .header-login {
    text-align: right;
  }
}
</style>
