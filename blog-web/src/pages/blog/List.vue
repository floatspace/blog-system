<!-- 组件说明: 博客 -->
<template>
  <div class="bloglist">
    <template v-if="blogList.length">
      <div class="bloglist-item" v-for="(item, index) in blogList" :key="index">
        <h1 class="title">{{ item.title | escape2Html }}</h1>
        <p>
          {{ item.content | contenFmt }}
          <el-link type="info" @click="showDetail(item.id)">查看详情</el-link>
        </p>
        <el-row>
          <el-col :span="23">
            <p>{{ item.author }} - {{ item.createtime }}</p>
          </el-col>
          <el-col :span="1" v-if="username && username !== 'FLS'">
            <el-link
              type="primary"
              icon="el-icon-edit"
              @click="editBlog(item.id)"
              >编辑</el-link
            >
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
    </template>
    <template v-else>
      <h2>您还没有发表过博客</h2>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      blogList: [],
      username: ''
    }
  },
  computed: {},
  watch: {
    $route(to) {
      console.log(to)
      this.username = to.query.author || sessionStorage.getItem('username')
      console.log(this.username)
      this.getBlogList()
    }
  },
  filters: {
    contenFmt(content) {
      return content.substr(0, 100) + '...'
    }
  },
  created() {
    const username = sessionStorage.getItem('username')
    this.username = username || ''
    this.getBlogList()
  },
  methods: {
    showDetail(id) {
      this.$router.push(`/blog/detail/${id}`)
    },
    editBlog(id) {
      this.$router.push(`/blog/edit/${id}`)
    },
    getBlogList() {
      let url = '/blog/list'
      url += this.username ? `?author=${this.username}` : ''
      // 请求博客数据
      this.$http
        .get(url)
        .then((data) => {
          this.blogList = data
        })
        .catch((err) => {
          this.$message.error(err)
        })
    }
  }
}
</script>

<style scoped>
.bloglist-item .title {
  margin-bottom: 10px;
}
.bloglist-item p {
  line-height: 30px;
}
</style>
