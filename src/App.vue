<template>
  <div>
    <Contanier />
    <!-- <app-manager/> -->
    <!-- <ManagerConfig/> -->

    <!-- <BaseAppManager /> -->
    <!-- <ConfigManage/> -->
  </div>
</template>

<script>
import Contanier from './components/Contanier.vue'
// import AppManager from './components/AppManager.vue'

// import ManagerConfig from './components/ManagerConfig.vue'

// import BaseAppManager from './components/BaseAppManager.vue'
// import ConfigManage from './components/ConfigManage.vue'

export default {
  name: 'App',
  components: {
    Contanier, //租户管理
    // AppManager, // 应用管理
    // BaseAppManager,
    // ManagerConfig,
    // ConfigManage, // 配置管理
  }
}
</script>

<style>

</style>
