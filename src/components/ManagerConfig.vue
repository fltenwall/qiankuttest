<template>
  <div class="container">
    <div class="header">
      <div class="header-left header-left-first">管理员配置</div>
      <div class="header-right" v-if="!this.isRecord">{{ currentGroup }}</div>
      <div class="header-right" v-else>
        <div class="header-right-title" @click="backToTable">
          <span style="color: #cccccc; cursor: pointer">{{ currentGroup }}</span> > 操作日志
        </div>
        <div class="header-right-search">
          <el-input
            suffix-icon="el-icon-search"
            placeholder="搜索企业/代码/内容"
            class="header-left-search"
            @change="search"
            v-model="searchInput"
          ></el-input>
          <el-button type="primary" @click="downloadExcel()">导出</el-button>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-left">
        <div
          class="main-left-item"
          @click="getManagerList('apps_super_admin')"
          v-bind:style="{
            background: styleObject.apps_super_admin.activeBackground,
          }"
        >
          <i
            class="el-icon-user-solid"
            v-bind:style="{
              color: styleObject.apps_super_admin.activeColor,
            }"
          ></i>
          企业管理后台超级管理员
        </div>
        <div
          class="main-left-item"
          @click="getManagerList('yzs_super_admin')"
          v-bind:style="{
            background: styleObject.yzs_super_admin.activeBackground,
          }"
        >
          <i
            class="el-icon-user-solid"
            v-bind:style="{
              color: styleObject.yzs_super_admin.activeColor,
            }"
          ></i
          >管理后台超级管理员
        </div>
        <div
          class="main-left-item"
          @click="getManagerList('yzs_child_admin')"
          v-bind:style="{
            background: styleObject.yzs_child_admin.activeBackground,
          }"
        >
          <i
            class="el-icon-user-solid"
            v-bind:style="{
              color: styleObject.yzs_child_admin.activeColor,
            }"
          ></i
          >管理平台子管理员
        </div>
      </div>
      <div class="main-right" v-if="!this.isRecord">
        <el-table
          :data="tableData"
          stripe
          style="
            width: 95%;
            font-size: 14px;
            line-height: 22px;
            color: #222222;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            margin:0 auto;
          "
          :header-cell-style="{
            textAlign: 'center',
            background: '#FBFBFB',
            fontSize: '14px',
            color: '#666666',
            fontWeight: 'normal',
          }"
          :cell-style="{ padding: '16px', textAlign: 'center' }"
        >
          <el-table-column prop="currentGroup" label="管理员"> </el-table-column>
          <el-table-column prop="managerListString" label="成员"> </el-table-column>
          <el-table-column prop="authMessage" label="权限"> </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="editManager(scope.row)" type="text" size="small" class="wordColor">编辑成员</el-button>
              <el-button type="text" @click="showRecord" class="wordColor">查看日志</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main-righ" v-else>
        <!-- <div class="main-right-table"> -->
        <el-table :data="recordList" style="width: 100%">
          <el-table-column fixed label="序号" type="index">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tenant_name" label="企业" v-if="this.adminTypes.apps_super_admin"> </el-table-column>
          <el-table-column prop="user_name" label="管理员"> </el-table-column>
          <el-table-column prop="from" label="模块"> </el-table-column>
          <el-table-column prop="createtime" label="时间"> </el-table-column>
          <el-table-column prop="info" label="操作内容"> </el-table-column>
        </el-table>
        <!-- </div> -->

        <div class="main-right-page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotalCount"
            background
          >
          </el-pagination>
        </div>
      </div>
      <el-dialog title="编辑成员" :visible.sync="dialogVisible" width="45%">
        <!-- 穿梭框 -->
        <ManagerConfigEdit ref="editChild" :managerList="managerList" :platformId="platformId" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" class="btn">取 消</el-button>
          <el-button type="primary" @click="saveData" class="btn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getManagerDetail, getManagerLog } from '../api/configManagerApi';
import { BASEURL } from '../api/baseApi';
import ManagerConfigEdit from './ManagerConfigEdit.vue';
export default {
  name: 'ManagerConfig',
  components: {
    ManagerConfigEdit,
  },
  data() {
    return {
      tableData: [],
      recordList: [],
      managerListString: '',
      managerList: [],
      currentGroup: '企业平台超级管理员',
      platformCode: '',
      platformId: 0,
      isRecord: false,
      // 页码相关变量
      currentPage: 1,
      pageTotalCount: 0,
      pageSize: 10,
      currentAreaId: 0,
      tabelIndex: 1,
      isPageSizeChange: false,
      searchInput: '',

      dialogVisible: false,

      adminTypes: {
        apps_super_admin: true,
        yzs_super_admin: false,
        yzs_child_admin: false,
      },
      styleObject: {
        apps_super_admin: {
          activeColor: '#0059DE',
          activeBackground: 'rgba(42, 106, 255, 0.1)',
        },
        yzs_super_admin: {
          activeColor: '#0059DE',
          activeBackground: 'rgba(42, 106, 255, 0.1)',
        },
        yzs_child_admin: {
          activeColor: '#0059DE',
          activeBackground: 'rgba(42, 106, 255, 0.1)',
        },
      },
    };
  },
  computed: {},
  methods: {
    async getManagerList(type = 'apps_super_admin') {
      for (let key in this.adminTypes) {
        if (key === type) {
          this.adminTypes[key] = true;
          this.styleObject[key].activeBackground = 'rgba(42, 106, 255, 0.1)';
          this.styleObject[key].activeColor = '#0059DE';
        } else {
          this.adminTypes[key] = false;
          this.styleObject[key].activeBackground = '';
          this.styleObject[key].activeColor = '#DDDDDD';
        }
      }
      const params = { platformCode: type };
      const res = await getManagerDetail(params);
      this.currentGroup = res?.data?.data?.currentGroup?.platformGroupName;
      this.managerListString = '';
      this.platformCode = res?.data?.data?.currentGroup?.platformCode;
      res?.data?.data?.userList.map(user => {
        this.managerListString += `${user.userName}, `;
        // this.managerList.push({userName:user.userName,id:user.id});
      });
      this.platformId = res?.data?.data?.currentGroup?.id;
      this.managerList = [...res?.data?.data?.userList];
      let authMessage = this.authMessage(this.platformCode);
      const manageList = [];
      manageList.push({
        managerListString: this.managerListString,
        currentGroup: this.currentGroup,
        authMessage,
      });
      this.tableData = manageList;
      this.isRecord = false;
    },
    authMessage(platformCode) {
      switch (platformCode) {
        case 'apps_super_admin':
          return '具有所有企业平台超级管理员的管理权限';
        case 'yzs_super_admin':
          return '具有管理平台超级管理员的管理权限';
        case 'yzs_child_admin':
          return '具有管理平台子管理员的管理权限';
      }
    },
    backToTable() {
      this.isRecord = false;
    },
    async showRecord() {
      this.isRecord = true;
      let params = {
        platformCode: this.platformCode,
        curPage: this.currentPage,
        keyword: '',
      };
      const res = await getManagerLog(params);
      const pageData = res?.data?.data?.pageData;
      this.recordList = res?.data?.data?.list;
      this.pageTotalCount = Number(pageData.total);
    },
    // 改变每页显示的页数
    async handleSizeChange(val) {
      this.isPageSizeChange = true;
      const res = await getManagerLog({
        platformCode: this.platformCode,
        curPage: 1,
        keyword: '',
        pageSize: val,
      });
      const pageData = res?.data?.data?.pageData;
      this.recordList = res?.data?.data?.list;
      this.pageTotalCount = Number(pageData.total);
      this.pageSize = Number(res.data.data.pageData.pageSize);
      this.currentPage = 1;
      this.isPageSizeChange = false;
    },
    // 切换页码
    async handleCurrentChange(val) {
      if (this.isPageSizeChange === true) return;
      const res = await getManagerLog({
        platformCode: this.platformCode,
        curPage: val,
        pageSize: this.pageSize,
        keyword: '',
      });
      this.recordList = res?.data?.data?.list;
      this.currentPage = val;
    },

    async search() {
      const res = await getManagerLog({
        platformCode: this.platformCode,
        curPage: 1,
        pageSize: this.pageSize,
        keyword: this.searchInput,
      });
      const pageData = res?.data?.data?.pageData;
      this.recordList = res?.data?.data?.list;
      this.pageTotalCount = Number(pageData.total);
      this.pageSize = Number(res.data.data.pageData.pageSize);
    },
    editManager() {
      this.dialogVisible = true;
    },
    downloadExcel() {
      window.open(`${BASEURL}banner/yzs-admin/export`);
    },
    async saveData() {
      const res = await this.$refs.editChild.save();
      if (res.data.code === 0) {
        this.$notify({
          title: '成功',
          message: '恭喜💐，保存成功！😜',
          type: 'success',
        });
        await this.getManagerList();
        this.dialogVisible = false;
      } else {
        this.$notify.error({
          title: '错误',
          message: `${res.data.msg}`,
        });
      }
    },
  },
  async created() {
    await this.getManagerList();
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  min-height: 604px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(50, 50, 51, 0.2);
  padding: 0;
}
.header {
  display: flex;
  flex-direction: row;
  box-shadow: inset 0px -1px 0px #e9ebee;
  font-weight: 600;
  font-size: 16px;
  line-height: 64px;
  color: #222222;
}
.header-left,
.header-right {
  box-sizing: border-box;
  padding: 12px 16px;
}
.header-right {
  flex: 1;
}
.header-right-title {
  float: left;
  line-height: 64px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
}
.header-right-search {
  float: right;
}

.header-left,
.header-left-search {
  width: 240px;
}
.header-left-search {
  margin-right: 20px;
}
.header-left-first {
  box-shadow: inset -1px -1px 0px #e9ebee;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.main-left,
.main-right {
  /* padding: 12px 16px; */
}

.main-left {
  min-width: 240px;
  box-shadow: inset -1px 0px 0px #e9ebee;
}

.main-left-item {
  padding: 13px 18px;
  height: 48px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  /* line-height: 48px; */
  color: #222222;
  cursor: pointer;
}

.main-right {
  flex: 1;
  margin-top: 16px;
}

.main-right-page {
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  float: right;
}

.main-right-table {
  padding: 20px;
}

.wordColor {
  font-size: 14px !important;
  color: #0059de !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-family: PingFang SC !important;
}

.btn {
  width: 80px !important;
  border-radius: 3px !important;
  color: #ffffff !important;
  font-size: 14px !important;
  font-family: PingFang SC !important;
  font-style: normal !important;
  font-weight: normal !important;
}

.btn:nth-child(1) {
  color: #222222 !important;
  background: #ffffff !important;
}
.btn:nth-child(2) {
  background: #0059de !important;
}
</style>