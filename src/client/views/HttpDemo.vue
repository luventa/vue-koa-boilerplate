<template>
  <section>
    <div>
      <h1>Normal Request</h1>
      <button @click="test1">Send</button>
      <div>Result: {{response1}}</div>
    </div>
    <div>
      <h1>Encrypted Request</h1>
      <button @click="test2">Send</button>
      <div>Result: {{response2}}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'http-demo-page',

  data () {
    return {
      response1: null,
      response2: null
    }
  },

  methods: {
    async test1 () {
      try {
        let res = await this.$http.post('/trade/book', { test: 'xixixi' })
        this.response1 = res.data.rtnMsg
      } catch (e) {
        console.error(e)
      }
    },
    test2 () {
      this.$https.post('/user/login', {
        test: 'hahaha'
      }).then(res => {
        this.response2 = res.data.content
      }).catch(e => {
        console.error(e)
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
