<template>
  <header>
    <nav>
      <section>
        <span>这是页头</span>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/count">Count</router-link></li>
        </ul>
      </section>
    </nav>
  </header>
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
header {
  height: 5rem;
  background-color: white;
  border-bottom: 1px solid gray;
}
</style>
