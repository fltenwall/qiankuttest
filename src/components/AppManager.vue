<template>
  <div class="container">
    <div class="header">
      <span class="header_title">我的应用</span>
    </div>
    <div class="appContainer">
      <div v-for="app in appList" :key="app.id" class="singleAppContainer">
        <app-manager-info
          :appTitle="app.name"
          :appApplyFor="app.apply_for"
          :appIconUrl="app.icon_url"
          :appDescription="app.description"
          :appId="app.id"
          :appType="app.type"
          :appInfo="app"
          :createAppLabel="createAppLabel"
          @changeDialogVisibleTrue="changeDialogVisibleTrue"
          @changeCurrentEditAppParams="changeCurrentEditAppParams"
          @getAllListData="getAllListData"
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

    <el-drawer title="新增/编辑APP" :visible.sync="dialogVisible" size="40%">
      <app-manager-form
        :currentEditAppParams="currentEditAppParams"
        :createAppLabel="createAppLabel"
        @changeDialogVisibleFalse="changeDialogVisibleFalse"
        @getAllListData="getAllListData"
        @changeCreateAppLabelFalse="changeCreateAppLabelFalse"
        @changeCreateAppLabelTrue="changeCreateAppLabelTrue"
      />
    </el-drawer>
  </div>
</template>

<script>
import AppManagerInfo from './AppManagerInfo.vue';
import AppManagerForm from './AppManagerForm.vue';

import { getListData, deleteSingleApp } from './../api/appManagerApi';
export default {
  name: 'AppManager',
  components: {
    AppManagerInfo,
    AppManagerForm,
  },
  data() {
    return {
      appList: [],
      dialogVisible: false,
      currentEditAppParams: {},
      createAppLabel: true,
    };
  },
  methods: {
    async getAllListData() {
      const appList = await getListData();
      this.appList = appList.data.data;
      console.log(this.appList);
    },
    changeDialogVisibleTrue() {
      this.dialogVisible = true;
    },
    changeDialogVisibleFalse() {
      this.dialogVisible = false;
    },
    changeCurrentEditAppParams(params) {
      this.currentEditAppParams = params;
      console.log('this.currentEditAppParams', this.currentEditAppParams);
    },
    async deleteApp(params) {
      const res = await deleteSingleApp(params);
      if (res !== 200) return;
      await this.getAllListData();
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
  },
  async created() {
    this.getAllListData();
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
  padding:20px;
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
  width: 20%;
  height: 200px;
  box-shadow: 0px 2px 8px rgba(100, 101, 102, 0.2);
  /* width: 40%; */
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  color: #0059DE;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.plusClass {
  font-size: 50px;
  margin-bottom: 20px;
}

.plusClassWord {
  font-size: 16px;
}
</style>