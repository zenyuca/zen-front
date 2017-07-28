<template lang="pug">
  #sidebar
    el-menu.el-menu-vertical-demo(:default-active="onRoutes", theme="dark", unique-opened="", router="")
      template(v-for="item in items")
        template(v-if="item.subs")
          el-submenu(:index="item.index")
            template(slot="title")
              i(:class="item.icon")
              | {{ item.title }}
            el-menu-item(v-for="(subItem,i) in item.subs", :key="i", :index="subItem.index")
              | {{ subItem.title }}
        template(v-else="")
          el-menu-item(:index="item.index")
            i(:class="item.icon")
            | {{ item.title }}
</template>

<script>
export default {
  name: 'sidebar',
  components: {
  },
  created () {
    this.account = this.$store.state.account
    const menus = this.$store.state.menus
    this.parseMenus(menus)
  },
  data () {
    return {
      account: {},
      items: []
    }
  },
  methods: {
    parseMenus (menus) {
      menus = menus.sort((a, b) => {
        let x = parseInt(a.menuParent) - parseInt(b.menuParent)
        if (x === 0) {
          x = parseInt(a.menuLevel) - parseInt(b.menuLevel)
        }
        return x
      })
      let list = []
      // 获得一级菜单
      menus.forEach(e => {
        if (e.menuParent === 0) {
          list.push(e)
        } else {
          return false
        }
      })
      // 获得二级菜单
      list.forEach(parent => {
        let sublist = []
        menus.forEach(sub => {
          if (parent.menuSeq === sub.menuParent) {
            sublist.push(sub)
          }
        })
        parent.sublist = sublist
      })

      // 转换菜单格式
      let items = []
      list.forEach((parent, pi) => {
        let item = {}
        item.icon = parent.menuIcon
        item.index = pi + ''
        item.title = parent.menuName

        let sublist = []
        parent.sublist.forEach((sub, si) => {
          let subitem = {}
          subitem.index = sub.menuUrl
          subitem.title = sub.menuName
          sublist.push(subitem)
        })
        item.subs = sublist

        items.push(item)
      })
      this.items = items
    }
  },
  computed: {
    onRoutes () {
      return this.$router.replace('/index')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  // #sidebar
</style>
