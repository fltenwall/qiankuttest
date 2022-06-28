<template>
  <div class="codeConnect">
    <!-- <div class="header">
      <div class="header-icon"></div>
      <h3 class="header-title">{{currentAreaName}}</h3>
    </div> -->
    <div class="main">
      <div class="main-header">
        <div>
          <!-- <i class="el-icon-arrow-left" @click="returnPage">返回</i>
          <i v-html="'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'"></i> -->
          <span>{{ this.tenantName }} (企业代码: {{ this.tenantCode }})</span>
        </div>

        <el-button type="primary" @click="addConnect" class="btn">添加服务商</el-button>
      </div>
      <div class="main-table">
        <el-table
          :data="tableData"
          border
          style="
            width: 100%;
            font-size: 14px;
            color: #222222;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
          "
          :row-style="{ height: '80px' }"
          :cell-style="{ padding: '0px', textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center', background: '#FBFBFB', fontSize: '14px' }"
        >
          <el-table-column fixed label="序号" width="100" type="index">
            <template slot-scope="scope">
              {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="partyName" label="服务商名称" width="240"> </el-table-column>
          <el-table-column prop="channelCode" label="租户代码"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editConnect(scope.row)" type="text" size="small" class="wordColor">编辑</el-button>
              <i v-html="'\u00a0\u00a0\u00a0\u00a0'"></i>
              <el-button @click="syncParty(scope.row)" type="text" size="small" class="wordColor">同步用户</el-button>
              <i v-html="'\u00a0\u00a0\u00a0\u00a0'"></i>
              <el-button
                @click="setAsMainPartyApi(scope.row)"
                type="text"
                size="small"
                class="wordColor"
                v-if="!scope.row.isMainParty"
                >设置为企业通讯录来源</el-button
              >
              <el-button type="text" v-else>当前主通讯录</el-button>
              <el-button @click="delParty(scope.row)" type="text" size="small" class="wordColor delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotalCount"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="codeConnectDialog" append-to-body>
      <el-form :model="form">
        <el-form-item label="选择服务商" :label-width="formLabelWidth" prop="channelName">
          <el-select
            v-model="selectChannel"
            :disabled="Boolean(disabled)"
            placeholder="请选择服务商"
            @change="selectChannelCall"
          >
            <el-option
              v-for="item in channelList"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务商租户代码" :label-width="formLabelWidth" prop="channelCode">
          <el-input
            v-model="channelCode"
            autocomplete="off"
            @change="editChannelCode"
            placeholder="请输入租户代码(仅支持英文字母及下划线组合)"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="codeConnectDialog = false">取 消</el-button>
        <el-button type="primary" :disabled="btnDisabled" @click="saveData()" class="btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPartyList,
  getCanUseChannel,
  addThirdParty,
  doSyncParty,
  getInitPg,
  setAsMainParty,
  delThirdParty,
} from '../api/apis';
export default {
  props: ['currentRow', 'page', 'currentAreaName', 'currentRowTenantId', 'currentTenantName', 'currentTenantCode'],
  name: 'Contanier',
  data() {
    return {
      tenantId: this.currentRowTenantId,
      tenantName: this.currentTenantName,
      tenantCode: this.currentTenantCode,
      form: {},
      channelCode: '',
      selectChannel: '',
      partyId: '',
      selectChannelObj: {},
      disabled: false,
      channelId: '',
      formLabelWidth: '120px',
      codeConnectDialog: false,
      dialogTitle: '',
      currentPage: 1, // 当前页码
      pageTotalCount: 0, // 数据总数
      pageSize: 10, // 每页数量
      isPageSizeChange: false,
      tableData: [],
      channelList: [], // 服务商列表
      currentRowData: this.currentRow,
      btnDisabled: false, // 按钮类型
      value: '',
    };
  },
  watch: {
    currentRow(newVal) {
      this.currentRowData = newVal;
      this.initData();
    },
    currentRowTenantId(newVal) {
      this.tenantId = newVal;
      this.initData();
    },
    currentTenantName(newVal) {
      this.tenantName = newVal;
    },
    currentTenantCode(newVal) {
      this.tenantCode = newVal;
    },
  },
  async created() {
    await this.initData();
  },
  methods: {
    async initData() {
      const tableData = await getPartyList({
        tenantId: this.tenantId,
        pageSize: 10,
        page: 1,
      });
      const channelList = await getCanUseChannel({
        tenantId: this.tenantId,
      });
      this.tableData = tableData.data.data.list;
      this.channelList = channelList.data.data;

      const pageData = tableData.data.data.pageData;
      this.pageTotalCount = pageData.total;
      this.pageSize = pageData.pageSize;
    },
    addConnect() {
      this.dialogTitle = '添加服务商';
      this.codeConnectDialog = true;
      this.disabled = false;

      this.channelCode = '';
      this.selectChannel = '';
      this.partyId = '';
    },
    editConnect(data) {
      this.dialogTitle = '编辑服务商';
      this.disabled = true;
      this.codeConnectDialog = true;

      this.selectChannelObj = data;
      this.channelCode = data.channelCode;
      this.selectChannel = data.partyName;
      this.partyId = data.partyId;
      this.channelId = data.channelId;
    },
    // 改变每页显示的页数
    async handleSizeChange(pageSize) {
      this.isPageSizeChange = true;
      const tableData = await getPartyList({
        tenantId: this.tenantId,
        pageSize: pageSize,
        page: 1,
      });
      this.tableData = tableData.data.data.list;
      const pageData = tableData.data.data.pageData;
      this.pageTotalCount = pageData.total;
      this.pageSize = pageData.pageSize;
      this.currentPage = 1;
      this.isPageSizeChange = false;
    },
    async handleCurrentChange(page) {
      if (this.isPageSizeChange === true) return;
      const tableData = await getPartyList({
        tenantId: this.tenantId,
        pageSize: this.pageSize,
        page: page,
      });
      this.tableData = tableData.data.data.list;
      this.currentPage = page;
    },
    async saveData() {
      // 格式校验
      let isValid = true;
      if (this.selectChannel === '') {
        this.$notify.error({
          title: '失败 😭',
          message: '服务商不能为空',
        });
        isValid = false;
      } else if (!/^[a-zA-Z][0-9a-zA-Z_-]*$/.exec(this.channelCode)) {
        this.$notify.error({
          title: '失败 😭',
          message: '服务商代码仅支持英文字母及下划线组合',
        });
        isValid = false;
      }
      if (!isValid) return;

      const params = {
        tenantId: this.tenantId || '', //租户ID
        channelId: this.selectChannelObj.channelId || this.channelId || '', //服务商ID
        channelName: this.selectChannelObj.channelName || this.selectChannel || '', //服务商名
        channelCode: this.channelCode, //租户code  用户填写的
        partyId: this.partyId || '',
      };
      this.btnDisabled = true;
      const res = await addThirdParty(params);
      if (res.data.code === 0) {
        this.$notify({
          title: '成功',
          message: '恭喜！💐 操作成功',
          type: 'success',
        });
        // 保存后重新请求数据，因为新增数据的partyId是取不到的
        await this.initData();
        this.codeConnectDialog = false;
        this.currentPage = 1; // 页码重置为1
        this.btnDisabled = false;
      } else {
        this.codeConnectDialog = true;
        this.$notify.error({
          title: '失败 😭',
          message: `${res.data.msg}`,
        });
        this.btnDisabled = false;
      }
    },
    selectChannelCall(selectData) {
      this.selectChannelObj = this.channelList.filter(item => item.channelName === selectData)[0];
    },

    editChannelCode(editData) {
      this.channelCode = editData;
    },

    returnPage() {
      this.$emit('closeDialogFormVisible');
    },

    // 同步数据
    async syncParty(data) {
      this.$confirm('同步服务商组织用户数据可能耗时几分钟到十几分钟不等，请耐心等待', '提示', {
        title: '同步数据',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const params = { partyId: data.partyId, tenantId: this.tenantId };
          doSyncParty(params).then(res => {
            if (Number(res.data.code) !== 0) {
              this.$message({
                type: 'error',
                message: '同步失败',
              });
              return;
            }
            getInitPg(params);
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消',
          });
        });
    },
    async delParty(row) {
      console.log(row, this.currentRowData);
      await delThirdParty({ tenantId: this.tenantId, partyId: row.partyId }).then(res => {
        if (Number(res.data.isSuccess) === 1 || res.code === 1) {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        } else {
          this.$message({
            type: 'error',
            message: `删除失败，${res.data.msg}`,
          });
        }
      });
      await this.initData();
    },
    // 设置为企业通讯录来源
    async setAsMainPartyApi(data) {
      const params = {
        partyId: data.partyId,
        tenantId: this.tenantId,
      };
      setAsMainParty(params).then(res => {
        if (Number(res.data.code) === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.handleSizeChange(this.pageSize);
        } else {
          this.$message({
            type: 'error',
            message: `失败，${res.data.msg}`,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.codeConnect {
  width: 100%;
  margin: 10px;
}
.header {
  padding: 20px 0;
  /* background-color: lightgrey; */
  border-bottom: 1px solid lightgrey;
  margin-bottom: 20px;
}

.header-title {
  margin: 0 auto;
  text-align: left;
}

.main {
  width: 95%;
  margin: 0 auto;
  min-height: 500px;
}

.main-page {
  margin-top: 20px;
  float: right;
}

.main-header {
  margin-bottom: 20px;
  font-size: 18px;
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.el-form-item__content {
  width: 100%;
  padding-left: 80px;
}

.el-select,
.el-input_inner {
  width: 100%;
}

.btn {
  background: #0059de !important;
  border-radius: 3px !important;
  color: #ffffff !important;
  font-size: 14px !important;
  font-family: PingFang SC !important;
  font-style: normal !important;
  font-weight: normal !important;
}

.wordColor {
  font-size: 14px !important;
  color: #0059de !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-family: PingFang SC !important;
}
.delete {
  color: red !important;
}
</style>
