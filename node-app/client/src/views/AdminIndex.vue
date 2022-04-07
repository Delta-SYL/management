<template>
    <div class="adminindex">
        <AdminHeadNav></AdminHeadNav>
        <div class="rightContainer">
        <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AdminHeadNav from '../components/AdminHeadNav.vue'
import AdminLeftMenu from '../components/AdminLeftMenu.vue'
export default ({
    name:'adminindex',
    components :{
        AdminHeadNav,
        AdminLeftMenu
    }
})
</script>
<style scoped>
.adminindex{
    width:100%;
    height: 100%;
    overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>