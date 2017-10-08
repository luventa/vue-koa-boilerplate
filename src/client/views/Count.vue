<template>
  <section>
    <div>
      <h1>前端计数</h1>
    </div>
    <div>
      <h1>后端接口测试</h1>
      <button @click="testApi">发送请求</button>
      <div>请求结果：{{apiRes}}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'count-page',

  data () {
    return {
      apiRes: null
    }
  },

  methods: {
    testApi () {
      this.$http.post('/api/demo/test').then(res => {
        this.$debug(res)
        this.apiRes = res.data.rtnMsg
      }).catch(e => {
        this.$debug(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  min-height: 40rem;
}
</style>
