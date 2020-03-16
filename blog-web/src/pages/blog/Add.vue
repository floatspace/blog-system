<!-- 组件说明: 新增随笔 -->
<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="随笔名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="随笔内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!data.title" type="primary" @click="addBlog('form')"
          >立即创建</el-button
        >
        <template v-else>
          <el-button type="success" @click="updateBlog('form')"
            >更新随笔
          </el-button>
          <el-button type="danger" @click="delBlog">删除随笔 </el-button>
        </template>
        <!-- <el-button @click="cancel">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      blogid: '',
      form: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请选择录入随笔标题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请选择录入随笔内容', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    data(val) {
      if (val.id) {
        this.blogid = val.id
        this.form.title = val.title
        this.form.content = val.content
      }
    }
  },
  methods: {
    delBlog() {
      this.$confirm('确定要删除本条随笔吗?').then(() => {
        this.$http.post('/blog/del', { id: this.blogid }).then((data) => {
          if (data.errorno === 0) {
            this.$message.success(data.message)
            this.$router.go(-1)
          }
        })
      })
    },
    updateBlog(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post('/blog/update', {
              id: this.blogid,
              title: this.form.title,
              content: this.form.content
            })
            .then((data) => {
              if (data.errorno === 0) {
                this.$message.success('更新成功')
                this.$router.push('/blog/list')
              }
            })
            .catch((err) => {
              console.log('err', err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addBlog(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/blog/new', { ...this.form }).then((data) => {
            if (data.id) {
              this.$message.success('新增成功')
              this.$router.push('/blog/list')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped></style>
