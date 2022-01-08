<template>
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top" :stretch="isStretch" >
      <el-tab-pane label="管理员配置" name="ManagerConfig" class="tabs"></el-tab-pane>
      <el-tab-pane label="高危操作确认" name="DangerConfirm" class="tabs"></el-tab-pane>
      <el-tab-pane label="基础应用管理" name="BaseAppManager" class="tabs"></el-tab-pane>
    </el-tabs>
    <manager-config v-if="controlShow.isManagerConfigShow" />
    <base-app-manager v-if="controlShow.isBaseAppManagerShow" />
    <danger-confirm v-if="controlShow.isDangerConfirmShow" />
  </div>
</template>

<script>
import ManagerConfig from './ManagerConfig.vue';
import BaseAppManager from './BaseAppManager.vue';
import DangerConfirm from './DangerConfirm.vue';
export default {
  name: 'ConfigManage',
  components: {
    ManagerConfig,
    BaseAppManager,
    DangerConfirm,
  },
  data() {
    return {
      activeName: 'ManagerConfig',
      isStretch: true,
      controlShow: {
        isManagerConfigShow: true,
        isBaseAppManagerShow: false,
        isDangerConfirmShow: false,
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      switch (tab.name) {
        case 'ManagerConfig':
          this.controlComponentShow('isManagerConfigShow');
          break;
        case 'BaseAppManager':
          this.controlComponentShow('isBaseAppManagerShow');
          break;
        case 'DangerConfirm':
          this.controlComponentShow('isDangerConfirmShow');
        break;
        default:
          this.controlComponentShow('isManagerConfigShow');
      }
    },
    controlComponentShow(componentName) {
      for (let key in this.controlShow) {
        this.controlShow[key] = Object.is(key, componentName);
      }
      console.log(this.controlShow);
    },
  },
};
</script>

<style>
.tabs {
  background:#ffffff ;
}

.el-tabs__nav-scroll{
  width: 40%!important;
  margin: 0 auto!important;
}

.el-tabs__item {
  color: #999999 !important;
  font-family: PingFang SC !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 14px !important;
}

.el-tabs__item.is-active {
  color: #2a66ff !important;
}
</style>