<template>
  <div :class="{'has-logo':showLogo}">
    <logo :collapse="isCollapse" v-if="showLogo"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        :text-color="variables.menuText"
        :unique-opened="false"
        mode="horizontal"
      >
        <sidebar-item :base-path="route.path" :item="route" :key="route.path" v-for="route in routes"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Sidebar/Logo'
  import SidebarItem from './Sidebar/SidebarItem'
  import variables from '@/styles/variables.scss'

  export default {
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
