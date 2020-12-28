<template>
  <div style="width: 100%;display: flex">
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </section>
  </div>

</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 1080px;
  margin: auto;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
