<template>
  <article class="container">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app-main',

  computed: mapGetters({
    _user: '_user'
  })
}
</script>

<style lang="scss" scoped>
</style>
