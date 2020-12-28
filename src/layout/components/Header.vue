<template>
  <div style="width: 100%;background:#48dfcc ;display: flex">
    <div style="width: 1080px;margin: auto;">
      <div class="header">
        <div class="title" style="color: #ffffff;"><img class="sidebar-logo" src="../../assets/logo.png"></div>
        <div class="sidebar">
          <el-menu active-text-color="#E3F2DB" background-color="#48dfcc" class="custom-menu" default-active="0"
                   mode="horizontal"
                   router
                   text-color="#fff" unique-opened>
            <template v-for="item in items">
              <el-submenu :index="item.index" v-if="item.subs">
                <template>
                  <el-menu-item :index="subItem.index" :key="i" v-for="(subItem,i) in item.subs">
                    <span slot="title">{{subItem.title}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item :index='item.index' :key="item.id" v-else>
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    computed: {},
    data() {
      return {
        name: 'Header',
        items: [
          {
            index: '/dashboard',
            title: '首页'
          },
          {
            index: '/write',
            title: '日记'
          },
          {
            index: '/timeline',
            title: '时间线'
          },
          {
            index: '/blog',
            title: '博客'
          }
        ],
        options: []

      }
    }
  }
</script>
<style lang="less" scoped>
  .title {
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    vertical-align: middle;
  }

  .custom-menu {
    height: 100px;
    margin: 1px;
  }

  .header {
    /*position: fixed;*/
    /*z-index: 111;*/
    /*box-sizing: border-box;*/
    width: 1080px;
    height: 70px;
    font-size: 26px;
    line-height: 70px;
    /*color: #999;*/
    margin: auto;
    display: flex;
  }

  .header .logo {
    float: left;
    height: 100%;
    display: inline-flex;
    align-items: center;
    margin-left: 50px;
    margin-right: 50px;
  }

  .el-menu-item {
    font-size: 18px;
    margin-right: 20px;
    /*display: inline-block;*/
    cursor: pointer;
    height: 100%;
  }


  .user-info {
    /*margin-right: 250px;*/
    float: right;
    padding-right: 50px;
    font-size: 16px;
    /*color: #fff;*/
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
    user-select: none;
  }

  @media (min-width: 320px) and (max-width: 920px) {
    .header {
      .logo {
        margin-left: 20px;

        img {
          width: 30px;
        }
      }
    }
  }

  .sidebar {
    display: block;
    /*margin-left: 250px;*/
    /*position: fixed;*/
    /*width: 250px;*/
    /*left: 250px;*/
    height: 70px;
    /*bottom: 0;*/
    /*background: #2E363F;*/
  }

  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin-right: 12px;
  }

  .sidebar > ul {
    height: 100%;
    overflow-y: auto;
  }

  a:link {
    font-size: 14px;
    color: #000000;
    text-decoration: none;
  }

  a:visited {
    font-size: 14px;
    color: #000000;
    text-decoration: none;
  }

  a:hover {
    font-size: 14px;
    color: #999999;
    text-decoration: underline;
  }

</style>
