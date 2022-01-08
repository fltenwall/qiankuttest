<template>
  <div class="container">
    <div class="header">
      <span class="header_title">基础应用</span>
    </div>
    <div class="appContainer">
      <div v-for="app in appList" :key="app.appId" class="singleAppContainer">
        <BaseAppManagerInfo
          :app="app"
          @getAppList="getAppList"
          :createAppLabel="createAppLabel"
          @changeDialogVisibleTrue="changeDialogVisibleTrue"
          @changeCurrentEditAppParams="changeCurrentEditAppParams"
          @changeCreateAppLabel="changeCreateAppLabelFalse"
          @changeDialogVisibleFalse="changeDialogVisibleFalse"
          @changeCreateAppLabelFalse="changeCreateAppLabelFalse"
        />
      </div>
      <div class="addAppDiv" @click="addApp">
        <i class="el-icon-plus plusClass"></i>
        <span class="plusClassWord">新建应用</span>
      </div>
    </div>

    <el-drawer :title="formTitle" :visible.sync="dialogVisible" size="40%">
      <base-app-managerForm
        :currentEditAppParams="currentEditAppParams"
        @changeCurrentEditAppParams="changeCurrentEditAppParams"
        :createAppLabel="createAppLabel"
        @changeDialogVisibleFalse="changeDialogVisibleFalse"
        @changeDialogVisibleTrue="changeDialogVisibleTrue"
        @getAppList="getAppList"
        @changeCreateAppLabelFalse="changeCreateAppLabelFalse"
        @changeCreateAppLabelTrue="changeCreateAppLabelTrue"
      />
    </el-drawer>
  </div>
</template>

<script>
import BaseAppManagerForm from './BaseAppManagerForm.vue';
import BaseAppManagerInfo from './BaseAppManagerInfo.vue';

import { getBaseApp } from '../api/baseAppManagerApi';

export default {
  name: 'BaseAppManager',
  data() {
    return {
      appList: [],
      dialogVisible: false,
      currentEditAppParams: {},
      createAppLabel: true,
    };
  },
  computed: {
    formTitle: function () {
      return this.createAppLabel === true ? '新建应用' : '编辑应用';
    },
  },

  components: {
    BaseAppManagerForm,
    BaseAppManagerInfo,
  },
  methods: {
    async getAppList() {
      const res = await getBaseApp();
      this.appList = res?.data?.data?.list;
    },
    changeDialogVisibleTrue() {
      this.dialogVisible = true;
    },
    changeDialogVisibleFalse() {
      this.dialogVisible = false;
    },
    addApp() {
      this.dialogVisible = true;
      this.currentEditAppParams = {};
      this.changeCreateAppLabelTrue();
    },
    changeCreateAppLabelFalse() {
      if (!this.createAppLabel) return;
      this.createAppLabel = false;
    },
    changeCreateAppLabelTrue() {
      if (this.createAppLabel) return;
      this.createAppLabel = true;
    },
    changeCurrentEditAppParams(params) {
      
      this.currentEditAppParams = params;
      console.log(777,this.currentEditAppParams);
    },
  },
  async created() {
    await this.getAppList();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.header_title {
  color: #222222;
  font-size: 20px;
  font-weight: 500;
  font-family: PingFang SC;
  font-style: normal;
}

.appContainer {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.singleAppContainer {
  /* flex: 1; */
  width: 25%;
  display: inline-block;
  /* border: 1px solid red; */
}

.addAppDiv {
  width: 22%;
  height: 140px;
  box-shadow: 0px 2px 8px rgba(100, 101, 102, 0.2);
  /* width: 40%; */
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  color: #0059de;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.addAppDiv:hover {
  box-shadow: 0px 2px 8px rgba(100, 101, 102, 0.6);
}

.plusClass {
  font-size: 50px;
  margin-bottom: 20px;
}

.plusClassWord {
  font-size: 16px;
}
</style>