<template>
  <nav>
    <div>
      <router-link to="/">
        <img src="/static/img/logo.png" alt="Vue Koa" />
      </router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/httpDemo">Http</router-link>
    </div>
  </nav>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app-header',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
nav {
  min-height: 3.25rem;
  background-color: white;
  position: relative;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
  display: flex;

  > div {
    display: flex;

    > a {
      line-height: 1.5;
      padding: 0.5rem 1rem;
      position: relative;
      display: flex;
      align-items: center;

      > img {
        max-height: 2.75rem;
        max-width: 100%;
      }
    }
  }
}
</style>
