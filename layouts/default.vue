<template>
  <div id="master">
    <no-ssr>
      <el-container>

        <el-header id="header">
          <a class="logo-name"
             href="./entry">ARWEN</a>
        </el-header>
        <el-container>

          <div class="el-aside">
            <el-menu :default-active="menus[0].url"
                     active-text-color="#41b883"
                     :router="true"
                     class="el-menu-vertical-demo"
                     :collapse="isCollapse">

              <div class="menu-active"
                   @click="activeMenu">
                <i :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"></i>
              </div>

              <el-menu-item v-for="(item, index) in menus"
                            :key="index"
                            :index="item.url">
                <i :class="item.icon"></i>
                <span slot="title"
                      class="name wse">{{ item.name }}</span>
              </el-menu-item>

            </el-menu>
          </div>

          <el-main id="main">
            <!-- <no-ssr>
        <nuxt-child :keepAlive="true" keep-alive/>
        </no-ssr> -->
            <nuxt-child />

          </el-main>

        </el-container>
        <!-- <el-footer id="footer">Footer</el-footer> -->
      </el-container>
    </no-ssr>
  </div>
</template>

<script>
const menus = [ // menu板块
  {
    icon: 'el-icon-star-on',
    name: '首页',
    url: '/entry'
  },
  {
    icon: 'el-icon-circle-close',
    name: '404',
    url: '/arwenfang'
  }
];

export default {
  data () {
    return {
      isCollapse: false,
      menus: menus
    }
  },
  created () { },
  methods: {
    activeMenu () {
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>


<style lang="less" scoped>
#master {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  padding: 10px 60px;
  height: 40px;
  width: 100%;
  z-index: 100;
}
.el-header {
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease-in-out;
  .logo-name {
    font-size: 1.5em;
    line-height: 40px;
    color: #41b883;
    font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    font-weight: 500;
  }
}
.el-container {
  display: flex;
  overflow: hidden;
  padding-top: 30px;
  box-sizing: border-box;
  height: 100%;
  .el-aside {
    height: 100%;
    overflow: hidden;
    .el-menu {
      min-width: 85px;
      height: 100%;
      padding: 10px 10px 20px 10px;
      box-sizing: border-box;
      .name {
        display: inline-block;
        width: 110px;
      }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .menu-active {
      text-align: center;
      cursor: pointer;
      i {
        font-size: 18px;
      }
    }
  }
  .el-main {
    margin: 0 !important;
    overflow: hidden;
    box-sizing: border-box;
  }
}
.el-footer {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
