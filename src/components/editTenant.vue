<template>
  <div class="container" demo-drawer__content>
    <div class="header">
      <div class="header-icon"></div>
      <h3 class="header-title">开通/编辑租户</h3>
    </div>
    <div class="forms">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" :rules="rules" status-icon>
        <el-form-item label="合同企业名称" prop="customerName">
          <el-select
            v-model="tenantName"
            filterable
            placeholder="请选择合同企业名称"
            :filter-method="searchTenantName"
            :loading="loading"
            @change="selectTenant"
          >
            <el-option v-for="item in tenantNames" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顶级企业名称" prop="topCustomerName">
          <el-input v-model="form.topCustomerName" disabled placeholder="顶级企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="tenantName">
          <el-input v-model="form.tenantName" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="所属区域" prop="ownerArea">
          <el-select v-model="form.ownerArea" placeholder="请选择所属区域" @change="selectAreaChange">
            <el-option
              v-for="item in ownerAreas"
              :key="item.areaId"
              :label="item.label"
              :value="item.areaId"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租户代码" prop="tenantCode">
          <el-input v-model="form.tenantCode" placeholder="请输入租户代码"></el-input>
        </el-form-item>
        <el-form-item label="项目经理" prop="adminName">
          <el-select
            v-model="form.adminName"
            filterable
            remote
            placeholder="请选择项目经理"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="selectPM"
          >
            <el-option v-for="item in options" :key="item.mobile" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员手机号" prop="adminPhone">
          <el-input v-model="form.adminPhone" placeholder="请输入管理员手机号"></el-input>
        </el-form-item>
        <el-form-item label="管理员邮箱" prop="adminEmail">
          <el-input v-model="form.adminEmail" placeholder="请输入管理员邮箱"></el-input>
          <span>用于推送账户信息到此邮箱</span>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNumber">
          <el-input v-model="form.contractNumber" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="expireAt">
          <el-date-picker
            v-model="form.expireAt"
            type="date"
            placeholder="请选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            class="block"
            @change="datePickerChange"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm" class="btn">取 消</el-button>
        <el-button type="primary" class="btn" @click="saveChange(form)" :loading="this.confirmLoading">{{
          this.confirmLoading ? '提交中 ...' : '确 定'
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { searchTenant, searchPm, getDetail, getCustomer, saveTenantInfo } from '../api/apis';
// import {deepEqual} from '../tools/index';

export default {
  name: 'editTenant',
  props: ['confirmLoading', 'editDialog', 'currentRowTenantId', 'eltreeData', 'editType', 'changeTableData'],
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      dialog: false,
      loading: false,
      validPeriod: '',
      form: {
        customerId: '',
        contractName: '', //合同企业名称
        topCustomerName: '', //顶级企业名称
        customerName: '', //企业名称
        ownerArea: '', //所属区域ID
        adminName: '', //项目经理名
        adminPhone: '', //项目经理手机
        adminEmail: '', //项目经理邮箱
        contractNumber: '', //合同编号
        expireAt: '', //有效期
        tenantId: '', //租户ID
        tenantName: '', //租户名
        tenantCode: '', //租户code
        dbName: '', //数据库名
      },
      options: [],
      pmName: '', // 项目经理名
      list: [],
      newConfirmLoading: this.confirmLoading,
      newEditDialog: this.editDialog,
      tenantNames: [],
      tenantName: '', // 合同企业名称
      currentTenantId: this.currentRowTenantId,
      currentEditType: this.editType,
      ownerArea: '',
      ownerAreas: this.eltreeData,
      // oldData: {},
      rules: {
        customerName: [{ required: true, message: '请选择合同企业名称', trigger: 'blur' }],
        tenantName: [{ required: true, message: '企业名称不能为空', trigger: 'blur' }],
        ownerArea: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        adminName: [{ required: true, message: '请选择项目经理', trigger: 'blur' }],
        adminEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        // expireAt: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        topCustomerName: [{ required: true, message: '顶级企业名称不能为空', trigger: 'blur' }],
        tenantCode: [{ required: true, message: '企业代码不能为空', trigger: 'blur' }],
        // contractNumber: [{ required: true, message: '合同编号不能为空', trigger: 'blur' }],
        adminPhone: [
          { required: true, message: '手机号不能为空' },
          { validator: checkPhone, trigger: 'blur' },
        ],
      },
    };
  },
  watch: {
    confirmLoading(newVal) {
      this.newConfirmLoading = newVal;
    },
    editDialog(newVal) {
      this.newEditDialog = newVal;
    },
    // 观察是否切换了编辑的行
    currentRowTenantId(newVal) {
      if (newVal === 0) return;
      this.currentTenantId = newVal;
      this.getDetailData(this.currentTenantId);
    },
    // 判断开通还是编辑
    editType(newType) {
      if (newType === 'add') {
        for (let key in this.form) {
          this.form[key] = '';
        }
        this.tenantName = '';
        this.pmName = '';
        if (this.tenantNames.length === 0) {
          searchTenant({ keyword: '' }).then(res => {
            res.data.data.forEach(item => {
              this.tenantNames.push({ value: item.value, label: item.label, id: item.id });
            });
          });
        }
      } else {
        this.getDetailData(this.currentTenantId);
      }
    },
  },
  created() {
    // 如果是编辑，初始化时请求数据
    if (!Object.is(this.currentTenantId, 0)) {
      this.getDetailData(this.currentTenantId);
    }
    // 初始化时请求合同名称列表
    searchTenant({ keyword: '' }).then(res => {
      res.data.data.forEach(item => {
        this.tenantNames.push({ value: item.value, label: item.label, id: item.id });
      });
    });
  },
  mounted() {},
  methods: {
    // 输入项目经理名称时触发
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        await searchPm({ keyword: query }).then(res => {
          this.options = res.data.data;
        });
        this.loading = false;
      } else {
        this.options = [];
      }
    },
    // 点击取消
    cancelForm() {
      this.newConfirmLoading = false;
      this.newEditDialog = false;
      // 通过父组件改变对话框状态
      this.$emit('changeConfirmDialog', false);
      this.$emit('changeConfirmLoading', false);
      this.$emit('changeConfirmTimeout');
    },
    // 搜索合同企业列表
    async searchTenantName(tenantName) {
      if (tenantName !== '') {
        this.loading = true;
        this.tenantNames = [];
        await searchTenant({ keyword: tenantName }).then(res => {
          res.data.data.forEach(item => {
            this.tenantNames.push({ value: item.value, label: item.label, id: item.id });
          });
        });
        this.loading = false;
      } else {
        return;
      }
    },
    // 获取初始化信息
    getDetailData(tenantId) {
      getDetail({ tenantId }).then(res => {
        if (Object.is(res.status, 200)) {
          const formData = res.data.data;
          // this.oldData = {...res.data.data};
          this.form = formData;
          this.ownerArea = formData.ownerArea;
          // 合同企业名称
          this.tenantName = formData.contractName;
          // 项目经理名
          this.pmName = formData.adminName;
          // 有效期
          this.validPeriod = formData.expireAt;
        }
      });
    },
    // 选择项目经理(不发送网络请求)
    selectPM(selected) {
      const selectedPM = this.options.filter(item => item.label === selected)[0];
      this.pmName = this.form.adminName = selectedPM.label;
      this.form.adminPhone = selectedPM.mobile;
      this.form.adminEmail = selectedPM.email;
    },
    // 选择合同企业名称
    selectTenant(selected) {
      const selectTenantId = this.tenantNames.filter(item => Object.is(item.value, selected));
      this.form.customerId = selectTenantId[0].id;
      this.form.tenantName = this.form.contractName = this.form.customerName = this.tenantName;
      getCustomer({ customerId: selectTenantId[0].id }).then(res => {
        this.form.topCustomerName = res.data.data.topCustomerName;
        this.ownerArea = this.form.ownerArea =
          res.data.data.ownerArea === '' || Object.is(Number(res.data.data.ownerArea), NaN)
            ? this.ownerAreas.filter(item => item.label === res.data.data.ownerArea)[0]?.areaId || '其他'
            : this.ownerAreas.filter(item => Number(item.areaId) === Number(res.data.data.ownerArea))[0]?.areaId || 0;
        if (this.editType === 'add') {
          this.form.tenantName = this.tenantName;
        }
      });
    },
    // 选择区域
    selectAreaChange(area) {
      this.form.ownerArea = area;
    },
    // 保存修改
    saveChange(formData) {
      // 格式校验
      let isValid = true;
      this.$refs['form'].validate(valid => {
        if (!valid) {
          this.$notify.error({
            title: '保存失败',
            message: `抱歉😭，检验未通过`,
          });
          isValid = false;
        }
      });
      if (!isValid) return;
      formData.tenantId = this.currentTenantId;

      // 如果是新增保存需要额外处理
      if (this.editType === 'add') {
        // 项目经理名称
        formData.adminName = this.pmName;
        formData.contractName = this.tenantName;
        formData.customerName = this.tenantName;
        formData.tenantId = 0;
      }
      // if (deepEqual(this.oldData, formData)) {
      //   this.$notify({
      //     title: '数据未修改',
      //     message: '数据未修改😳 ！',
      //     type: 'warning',
      //   });
      //   return;
      // }
      saveTenantInfo(formData).then(res => {
        if (res.data.code === 0) {
          this.$notify({
            title: '保存成功',
            message: '恭喜😜 保存成功！',
            type: 'success',
          });
          if (this.editType === 'add') {
            for (let key in this.form) {
              this.form[key] = '';
            }
            this.tenantName = this.pmName = '';
          }
          this.$emit('changeTableData', false);
          this.$emit('changeConfirmDialog', false);
          this.$emit('changeConfirmLoading', false);
          this.$emit('changeConfirmTimeout');
        } else {
          this.$notify.error({
            title: '保存失败',
            message: `抱歉😭，${res.data.msg}，请重新操作`,
          });
        }
      });
    },
    // 日期选择
    datePickerChange(selectData) {
      this.form.expireAt = selectData;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.header {
  padding: 20px 0;
  /* background-color: lightgrey; */
  border-bottom: 1px solid lightgrey;
  margin-bottom: 20px;
}

.header-title {
  margin: 0 50px;
  text-align: left;
  font-size: 16px !important;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  color: #222222;
}
.forms {
  width: 70%;
  margin: 0 50px;
}

/* 表单对齐 */
.el-form-item__content {
  width: 100%;
  padding-left: 80px;
  color:red;
}

.el-select,
.el-input_inner {
  width: 100%;
}

.block {
  width: 100% !important;
}

.btn {
  width: 30% !important;
  /* background: #0059de !important; */
  border-radius: 3px !important;
  color: #ffffff !important;
  font-size: 14px !important;
  font-family: PingFang SC !important;
  font-style: normal !important;
  font-weight: normal !important;
}
.btn:nth-child(1) {
  color: #222222 !important;
}
.btn:nth-child(2) {
  background: #0059de !important;
}
</style>