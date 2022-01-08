<template>
  <div class="main">
    <div class="left">
      <div class="header">
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
          >全部成员</el-checkbox
        > -->
        选择成员
      </div>
      <div class="body">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="搜索姓名/账号"
          class="header-left"
          @change="search"
          v-model="searchInput"
        ></el-input>
        <el-table
          style="
            width: 100%;
            font-size: 14px;
            line-height: 22px;
            color: #222222;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            margin-top: 10px;
          "
          :header-cell-style="{
            textAlign: 'center',
            background: '#FBFBFB',
            fontSize: '14px',
            color: '#666666',
            fontWeight: 'normal',
          }"
          :cell-style="{ textAlign: 'center' }"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          @select="select"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="usercode" label="账号"> </el-table-column>
          <el-table-column prop="deptName" label="部门"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right">
      <div class="header">已选</div>
      <div class="body" v-for="(item, index) in this.selectedManagerList" :key="item.id">
        <div class="item">
          <span>{{ item.userName }}</span>
          <i class="el-icon-delete" @click="deleteUser(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchPm } from '../api/apis';
import { saveMultiManager } from '../api/configManagerApi';
export default {
  name: 'ManagerConfigEdit',
  props: ['managerList', 'platformId'],
  data() {
    return {
      searchInput: '',
      tableData: [],
      multipleSelection: [],
      selectedManagerList: this.managerList,
      rows: [],
      tempObj: {},
      isCancelSelect: true,
    };
  },
  methods: {
    async search() {
      if (this.searchInput !== '') {
        await searchPm({ keyword: this.searchInput }).then(res => {
          this.tableData = res.data.data;
        });
        this.tempObj = {};
        this.selectedManagerList.map(item => (this.tempObj[item.userCode] = item));
        this.tableData.map(item => {
          if (this.tempObj[item.usercode]) {
            console.log(1111, item);
            this.$refs.multipleTable.toggleRowSelection(item, true);
          }
        });
      } else {
        this.tableData = [];
      }
    },
    handleSelectionChange(select) {
      select.map(user => {
        console.log(555, user, user.usercode, this.tempObj[user.usercode]);
        if (!this.tempObj[user.usercode]) {
          user.userName = user.username;
          user.userCode = user.usercode;
          this.selectedManagerList.push(user);
          this.tempObj[user.usercode] = user;
          this.$message({
            message: '添加成员成功',
            type: 'success',
          });
        }
      });
    },
    select(selection, row) {
      let sele = selection.filter(item => {
        item.usercode === row.usercode;
      });
      // 判断是否取消选择
      if (sele.length === 0) this.isCancelSelect = true;
      if (selection.length === 0) this.isCancelSelect = true;
      if (this.isCancelSelect) {
        for (let i = 0; i < this.selectedManagerList.length; i++) {
          if (this.selectedManagerList[i].userCode === row.usercode) {
            delete this.tempObj[this.selectedManagerList[i].userCode];
            this.selectedManagerList.splice(i, 1);
            this.$message({
              message: '删除成员成功',
              type: 'success',
            });
            break;
          }
        }
      }
    },
    deleteUser(index) {
      this.tableData.map(item => {
        if (item.userCode === this.selectedManagerList[index].usercode) {
          this.$refs.multipleTable.toggleRowSelection(item, false);
          delete this.tempObj[item.usercode];
        }
      });
      this.selectedManagerList.splice(index, 1);
      this.$message({
        message: '删除成员成功',
        type: 'success',
      });
    },
    async save() {
      const params = {
        platformId: Number(this.platformId),
        list: this.selectedManagerList,
      };
      return await saveMultiManager(params);
    },
  },
  created() {
    console.log(this.managerList);
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 400px;
  /* min-width: 664px; */
  /* padding: 96px 24px; */
  border-radius: 3px;
}
.left,
.right {
  flex: 1;
  max-height: 526px;
  border-radius: 3px;
  border: 1px solid #e9ebee;
  box-sizing: border-box;
  overflow: scroll;
}
.left {
  margin-right: 16px;
}
.header {
  background: #f9f9f9;
  border: 1px solid #e9ebee;
  box-sizing: border-box;
  border-radius: 3px 3px 0px 0px;
  height: 40px;
  line-height: 40px;
  padding-left: 16px;
  color: #666666;
  font-size: 13px;
}
.body {
  padding: 8px 16px;
  height: 32px;
}
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>