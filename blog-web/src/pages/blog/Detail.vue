<!-- 组件说明: 博客详情 -->
<template>
  <div class="blog-detail">
    <h1 class="title">{{ blogInfo.title | escape2Html }}</h1>
    <div class="content">
      {{ blogInfo.content }}
    </div>
    <el-divider></el-divider>
    <p class="author">
      posted @ {{ blogInfo.createtime }} {{ blogInfo.author }} 阅读(0) 评论(0)
      编辑 收藏
    </p>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      blogId: '',
      blogInfo: {}
    }
  },
  created() {
    this.blogId = this.$route.params.id
    this.getBlogInfo(this.blogId)
  },
  methods: {
    getBlogInfo(blogId) {
      this.$http.get(`/blog/detail?id=${blogId}`).then((data) => {
        this.blogInfo = data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.blog-detail {
  .title {
    font-size: 26px;
    margin: 20px 0;
  }
  .content {
    line-height: 28px;
  }
  .author {
    margin: 3px 0;
  }
}
</style>
