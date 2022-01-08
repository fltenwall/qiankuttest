<template>
  <div class="contanier">
    <div class="left">
      <div class="left-header">
        <el-input
          v-model="searchInput"
          suffix-icon="el-icon-search"
          placeholder="输入企业/顶级企业/企业号/合同企业名称搜索"
          class="header-left"
          @change="handleNodeClick({ page: 1, pageSize: pageSize, areaId: 0, keyword: searchInput }, 'search')"
          @focus="searchFocus"
          @blur="searchBlur"
        >
        </el-input>
      </div>
      <div class="left-main">
        <el-tree
          :data="eltreeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :highlight-current="highlightCurrent"
          :default-expand-all="Boolean(defaultExpandAll)"
          class="tree"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node treeNode">
            <span>
              <i v-if="data.children !== undefined" class="el-icon-folder-opened" /> <i v-else class="el-icon-folder" />
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
    </div>

    <div class="right">
      <div class="right-header">
        <div class="main-right-title">{{ this.currentAreaName }}</div>
        <el-button type="primary" @click="editTenantClick('add')" class="main-right-button">添加租户</el-button>
      </div>
      <div class="right-main">
        <div class="main-right-table">
          <el-table
            :data="tableData"
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
            <el-table-column fixed label="序号" width="60" type="index">
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column>
            <el-table-column fixed prop="topCustomerName" label="顶级企业名称"> </el-table-column>
            <el-table-column prop="tenantName" label="合同企业名称"> </el-table-column>
            <el-table-column prop="tenantCode" label="企业代码"> </el-table-column>
            <el-table-column prop="adminName" label="项目经理"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="editTenantClick('edit', scope.row)" type="text" size="small" class="wordColor"
                  >编辑</el-button
                >
                <i v-html="'\u00a0\u00a0\u00a0\u00a0'"></i>
                <el-popover placement="right" trigger="click">
                  <el-button
                    size="small"
                    type="text"
                    :disabled="Boolean(enableEmail)"
                    class="wordColor"
                    @click="sendMailCallback({ tenantId: scope.row.tenantId })"
                    >重发激活邮件</el-button
                  >

                  <el-button
                    @click="dialogFormVisible = true"
                    type="text"
                    size="small"
                    style="margin-left: 16px"
                    class="wordColor"
                    >关联服务商租户</el-button
                  >

                  <el-button slot="reference" type="text" size="small" @click="moreClick(scope.row)" class="wordColor"
                    >更多</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
        <el-drawer
          :title="dialogTitle"
          :visible.sync="editTenantDialog"
          class="dialog"
          direction="rtl"
          ref="drawer"
          custom-class="demo-drawer"
          size="40%"
        >
          <edit-tenant
            :confirmLoading="this.confirmLoading"
            :editDialog="this.editDialog"
            :currentRowTenantId="this.currentRowTenantId"
            :editType="this.editType"
            :eltreeData="this.eltreeData[0].children"
            @changeConfirmDialog="changeConfirmDialog"
            @changeConfirmLoading="changeConfirmLoading"
            @changeConfirmTimeout="changeConfirmTimeout"
            @changeTableData="changeTableData"
          />
        </el-drawer>
      </div>
      <el-dialog :visible.sync="dialogFormVisible" width="90%" :show-close=false>
        <codeConnect
          :currentRow="this.currentRowData"
          :currentRowTenantId="this.currentRowTenantId"
          :pageSize="this.pageSize"
          :page="this.currentPage"
          :currentAreaName="this.currentAreaName"
          @closeDialogFormVisible="this.closeDialogFormVisible"
          
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import editTenant from './editTenant.vue';
import codeConnect from './codeConnect.vue';
import { getAreaList, getTenantList, sendMail } from '../api/apis';
export default {
  name: 'Contanier',
  components: {
    editTenant,
    codeConnect,
  },
  data() {
    return {
      defaultExpandAll: true,
      loading: true,
      confirmLoading: false,
      timer: null,
      searchInput: '',
      dialogTitle: '',
      fullscreen: true,
      editTenantDialog: false,
      editDialog: false,
      currentRowTenantId: 0,
      currentRowData: {},
      editType: 'edit',
      // 页码相关变量
      currentPage: 1,
      pageTotalCount: 0,
      pageSize: 10,
      currentAreaId: 0,
      currentAreaName: '明源云客户',
      isPageSizeChange: false,
      highlightCurrent: true,
      eltreeData: [
        {
          label: '明源云客户',
          children: [],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      tableData: [],
      enableEmail: true,
      dialogFormVisible: false,
    };
  },
  methods: {
    changeConfirmDialog(editTenantDialog) {
      this.editTenantDialog = editTenantDialog;
    },
    changeConfirmLoading(confirmLoading) {
      this.confirmLoading = confirmLoading;
    },
    changeConfirmTimeout() {
      clearTimeout(this.timer);
    },
    editTenantClick(type, data) {
      if (type === 'edit') {
        this.currentRowTenantId = data.tenantId;
        this.editType = 'edit';
      } else {
        this.currentRowTenantId = 0;
        this.editType = 'add';
      }
      this.editTenantDialog = true;
    },
    codeConnectClick() {
      this.editDialog = true;
    },
    // 改变每页显示的页数
    async handleSizeChange(val) {
      this.isPageSizeChange = true;
      const res = await getTenantList({ page: 1, pageSize: val, areaId: this.currentAreaId });
      this.tableData = res.data.data.list;
      this.pageTotalCount = Number(res.data.data.pageData.total);
      this.pageSize = Number(res.data.data.pageData.pageSize);
      this.currentPage = 1;
      this.isPageSizeChange = false;
    },
    async handleCurrentChange(val) {
      if (this.isPageSizeChange === true) return;
      const res = await getTenantList({
        page: `${val}`,
        pageSize: this.pageSize,
        areaId: this.currentAreaId,
        keyword: this.searchInput,
      });
      this.tableData = res.data.data.list;
      // this.pageTotalCount = Number(res.data.data.pageData.total);
      // this.pageSize = Number(res.data.data.pageData.pageSize);
      this.currentPage = val;

      this.enableEmail = res.data.data.adminType === 1 ? false : true;

      // this.currentPage = val;
    },
    async handleNodeClick(nodeData, type) {
      if (type !== 'search') this.searchInput = '';
      getTenantList({ page: 1, pageSize: this.pageSize, areaId: nodeData.areaId || 0, keyword: nodeData.keyword }).then(
        res => {
          if (res.status === 200) {
            this.tableData = res.data.data.list;
            this.pageTotalCount = Number(res.data.data.pageData.total);
            this.pageSize = Number(res.data.data.pageData.pageSize);
          }
        }
      );
      this.currentAreaId = nodeData.areaId;
      this.currentAreaName = nodeData.label;
      this.currentPage = 1;
    },
    moreClick(rowData) {
      this.currentRowData = { ...rowData };
    },
    // 获得页面左侧区域列表
    // 进入页面初始化请求数据
    async initResponse() {
      // 页面左侧区域列表
      getAreaList().then(res => {
        if (res.status === 200) {
          const areaData = res.data.data;
          areaData.forEach(item => this.eltreeData[0].children.push({ label: item.areaName, areaId: item.areaId }));
        } else {
          throw new Error('后端服务异常');
        }
      });
      // 页面右侧表格数据
      getTenantList({ page: 1, pageSize: 10, areaId: 0 }).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data.list;
          this.pageTotalCount = Number(res.data.data.pageData.total);
          this.pageSize = Number(res.data.data.pageData.pageSize);
        }
        this.enableEmail = res.data.data.adminType === 1 ? false : true;
      });
    },

    // 重发激活邮件
    async sendMailCallback(tenantId) {
      const res = await sendMail(tenantId);
      if (res.data.code === 0) {
        this.$notify({
          title: '成功',
          message: '激活邮件已发送成功！🤭',
          type: 'success',
        });
      }
    },
    async changeTableData() {
      // this.tableData = await this.handleNodeClick({
      //   areaId: this.currentAreaId,
      //   label: this.currentAreaName,
      //   keyword: this.searchInput,
      // });
      if (this.editType === 'add') this.currentPage = 1;
      const res = await getTenantList({
        page: this.currentPage,
        pageSize: this.pageSize,
        areaId: this.currentAreaId,
        keyword: this.searchInput,
      });
      this.tableData = res.data.data.list;
      this.pageTotalCount = Number(res.data.data.pageData.total);
      this.pageSize = Number(res.data.data.pageData.pageSize);
    },

    //
    closeDialogFormVisible() {
      this.dialogFormVisible = false;
    },
    // 模糊搜索框焦点改变事件
    searchFocus() {
      this.highlightCurrent = false;
    },
    searchBlur() {
      this.highlightCurrent = true;
    },
  },
  async created() {
    await this.initResponse();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* ------------------- */
.contanier {
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: row;

  width: 80%;
  margin: 0 auto;
  /* padding: 20px; */
  font-size: 14px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(50, 50, 51, 0.2);
}

.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* padding-right: 60px; */
  line-height: 60px;
  border-right: 1px solid #f1ebeb;
  /* box-shadow: inset -1px 0px 0px #E9EBEE; */
  /* padding: 20px; */
}

.left-header {
  padding: 0px 20px;
  /* border-bottom: 1px solid #f1ebeb; */
  box-shadow: inset 0px -1px 0px #e9ebee;
}

.header-left {
  height: 60px;
  border-radius: 3px;
  color: #cccccc;
}

.left-main {
  padding-top: 10px;
}

.right {
  flex: 3;

  display: flex;
  flex-direction: column;

  /* border: 1px solid #f1ebeb; */
}

.right-header {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border-bottom: 1px solid #f1ebeb; */
  box-shadow: inset 0px -1px 0px #e9ebee;
  padding: 0px 20px;
}

.main-right-title {
  line-height: 60px;
  font-size: 16px;
  color: #222222 !important;
  font-family: PingFang SC !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  line-height: 60px;
}

.main-right-button {
  height: 42px;
  margin-top: 8px !important;
  background: #0059de !important;
  border-radius: 3px !important;
  color: #ffffff !important;
  font-size: 14px !important;
  font-family: PingFang SC !important;
  font-style: normal !important;
  font-weight: normal !important;
}

.right-main {
  flex: 1;
}
.main-right-table {
  padding: 20px;
}

.main-right-page {
  margin-top: 20px;
  margin-right: 20px;
  float: right;
}
.dialog {
  width: 100%;
  height: 100%;
  /* background-color: lightgrey; */
}
.editDialog {
  width: 100%;
  height: 100%;
}

.wordColor {
  font-size: 14px !important;
  color: #0059de !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-family: PingFang SC !important;
}

.tree {
  margin-left: 20px;
}

.treeNode {
  color: #222222;
  font-size: 14px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
}

.treeNode:hover {
  color: #0059de;
}

/* 树形结构样式 */
.el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(42, 106, 255, 0.1) !important;
  color: #0059de !important;
}
.el-tree-node__content:hover {
  background-color: rgba(42, 106, 255, 0.05) !important;
  color: #0059de !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(42, 106, 255, 0.1) !important;
  color: #0059de !important;
}
</style>
