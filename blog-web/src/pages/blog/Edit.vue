<!-- 组件说明: 随笔编辑 -->
<template>
  <div>
    <add :data="blogInfo"></add>
  </div>
</template>

<script>
import Add from './Add'
export default {
  name: '',
  components: { Add },
  data() {
    return {
      blogInfo: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    const id = this.$route.params.id
    this.getDetail(id)
  },
  methods: {
    getDetail(id) {
      this.$http.get(`/blog/detail?id=${id}`).then((data) => {
        if (data) {
          this.blogInfo = data
        }
      })
    }
  }
}
</script>

<style scoped></style>
