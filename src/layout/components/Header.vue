<template>
  <div style="width: 100%;background:#fff ;display: flex">
    <div style="width: 1080px;margin: auto;background:#fff    ;border-bottom: 1px solid #dcdfe6;">
      <div class="el-menu-demo">
        <div class="sidebar">
          <div class="title">
            <!--            <img class="sidebar-logo" src="../../assets/logo-ele.png">-->
            <div class="svg">
              <svg class="icon" height="100%" p-id="3057" t="1609234915375"
                   version="1.1" viewBox="0 0 1024 1024" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M160 160v704h704V160H160z m64 64h576v576H224V224z m128 128v320h64V352h-64z m128 0v64h192v-64h-192z m0 128v64h192v-64h-192z m0 128v64h192v-64h-192z"
                  fill="#409eff" p-id="3058"></path>
              </svg>
            </div>
            <div class="text-custom">格子日志</div>
          </div>

          <el-menu class="custom-menu" default-active="0"
                   mode="horizontal"
                   router
                   unique-opened>
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
    display: flex;
    color: #fff;
    margin-right: 100px;
    font-weight: 700;
    vertical-align: middle;

    .svg {
      width: 48px;
      height: 48px;
      margin: auto;
      /*align-items: center;*/
    }

  }

  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
  }

  .text-custom {
    margin: auto;
    padding-left: 10px;
    font-size: 25px;
    color: #409eff;
    @font-face {
      font-family: 'webfont';
      font-display: swap;
      src: url('//at.alicdn.com/t/webfont_e7nx9pxmyng.eot'); /* IE9*/
      src: url('//at.alicdn.com/t/webfont_e7nx9pxmyng.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/webfont_e7nx9pxmyng.woff2') format('woff2'),
      url('//at.alicdn.com/t/webfont_e7nx9pxmyng.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/webfont_e7nx9pxmyng.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/webfont_e7nx9pxmyng.svg#思源黑体-粗') format('svg'); /* iOS 4.1- */
    }
  }

  .custom-menu {
    height: 100px;
  }

  .header {
    /*position: fixed;*/
    /*z-index: 111;*/
    /*box-sizing: border-box;*/
    width: 1080px;
    height: 60px;
    font-size: 26px;
    line-height: 60px;
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

  hr {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .el-menu-item {
    font-size: 18px;
    text-align: center;
    align-items: center;
    margin-right: 20px;
    display: inline-block;
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
    display: flex;
    margin-left: 50px;
    /*position: fixed;*/
    /*width: 250px;*/
    left: 50px;
    height: 60px;

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
