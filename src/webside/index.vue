<template>
  <el-container>
    <el-header style="background: red">
      <el-menu :default-active="activeMenu" @select="handleSelect" class="el-menu-demo" mode="horizontal">
        <el-menu-item :base-path="route.path" :item="route" :key="route.path" v-for="route in routes"/>
      </el-menu>
    </el-header>
    <el-main style="background: green">main</el-main>
    <el-footer style="background: blue">footer</el-footer>
  </el-container>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Logo from '../layout/components/Sidebar/Logo'
  import SidebarItem from '../layout/components/Sidebar/SidebarItem'
  import variables from '@/styles/variables.scss'

  export default {
    name: 'WebSide',
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      routes() {
        return this.$router.options.routes
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }

  }
</script>
<style>

</style>




