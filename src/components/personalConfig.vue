<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <h2 class="title">通讯录配置</h2>
      <el-form-item label="企业主通讯录来源" prop="selectedType">
        <el-select v-model="ruleForm.selectedType.label" placeholder="企业主通讯录来源" @change="changeSletedType">
          <el-option v-for="item in selectedTypeList" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择服务商" prop="selectedServer" v-if="Number(ruleForm.selectedType.value) === 1">
        <el-select v-model="ruleForm.selectedServer">
          <el-option
            placeholder="请选择选择服务商"
            v-for="(serve, index) in this.personalConfigData.selectList"
            :key="index"
            :label="serve.channelName"
            :value="serve.channelId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="API获取企业通讯录"
        prop="thirdPartyData.partyApiUrl"
        v-if="Number(ruleForm.selectedType.value) === 1"
      >
        <el-input v-model="ruleForm.thirdPartyData.partyApiUrl" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item
        label="API域名"
        prop="basicData.apiHost"
        v-if="Number(ruleForm.selectedType.value) === 2"
        style="width: 500px"
      >
        <el-input v-model="ruleForm.basicData.apiHost"></el-input>
      </el-form-item>
      <el-form-item
        label="AppKey"
        prop="basicData.apiKey"
        v-if="Number(ruleForm.selectedType.value) === 2"
        style="width: 500px"
      >
        <el-input v-model="ruleForm.basicData.apiKey"></el-input>
      </el-form-item>
      <el-form-item
        label="AppSecret"
        prop="basicData.appSecret"
        v-if="Number(ruleForm.selectedType.value) === 2"
        style="width: 500px"
      >
        <el-input v-model="ruleForm.basicData.appSecret"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkData('ruleForm')">保存</el-button>
        <el-button @click="cacleHandle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { saveTenantPrivateConfig as saveTenantPrivateConfigApi } from '../api/apis';
export default {
  name: 'personalConfig',
  props: ['personalConfigData', 'currentRowTenantId', 'editTenantDialog'],
  watch: {
    personalConfigData(newVal) {
      this.resetForm('ruleForm');
      if (newVal.channelType === 2) {
        this.ruleForm.basicData = { ...newVal.basicData };
        this.ruleForm.selectedType = { value: 2, label: '基础数据平台' };
      }
      if (newVal.channelType === 1) {
        this.ruleForm.thirdPartyData = { channelId: newVal.thirdPartyData.partyId, ...newVal.thirdPartyData };
        this.ruleForm.selectedType = { value: 1, label: '服务商用户' };
        this.ruleForm.selectedServer = this.ruleForm.thirdPartyData.partyName;
      }
    },
    currentRowTenantId(newVal) {
      this.tenantId = newVal;
    },
    editTenantDialog(newVal) {
      if (!newVal) {
        this.resetForm('ruleForm');
        this.$emit('changeSelectedTab', 'basicInformation');
      }
    },
  },
  data() {
    return {
      tenantId: this.currentRowTenantId,
      selectedTypeList: [
        {
          value: '1',
          label: '服务商用户',
        },
        {
          value: '2',
          label: '基础数据平台',
        },
      ],
      ruleForm: {
        selectedType: { value: 2, label: '基础数据平台' },
        selectedServer: '',
        basicData: {
          apiHost: '',
          apiKey: '',
          appSecret: '',
        },
        thirdPartyData: {
          channelId: '',
          partyApiUrl: '',
        },
      },
      rules: {
        selectedType: [{ required: true, message: '请选择企业通讯录来源', trigger: 'change' }],
        selectedServer: [{ required: true, message: '请选择服务商', trigger: 'change' }],
        basicData: {
          apiHost: [{ required: true, message: '请填写API域名', trigger: 'blur' }],
          apiKey: [{ required: true, message: '请填写AppKey', trigger: 'blur' }],
          appSecret: [{ required: true, message: '请填写AppSecret', trigger: 'blur' }],
        },
        thirdPartyData: {
          partyApiUrl: [{ required: true, message: '请填写获取通讯录的API地址', trigger: 'change' }],
        },
      },
    };
  },
  methods: {
    async checkData(formName) {
      let isChecked = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$notify.error({
            title: '保存失败 😭',
            message: `请检查填写内容`,
          });
          isChecked = false
          return;
        }
      });
      if(!isChecked) return
      await this.submitForm();
    },
    async submitForm() {
      let data = {};
      if (Number(this.ruleForm.selectedType.value) === 2) {
        data = {
          tenantId: this.tenantId, //租户ID
          channelType: 2,
          basicData: { ...this.ruleForm.basicData },
        };
      }
      if (Number(this.ruleForm.selectedType.value) === 1) {
        data = {
          tenantId: this.tenantId, //租户ID
          channelType: 1, //企业通讯录类型 1服务商  2基础数据
          thirdPartyData: { ...this.ruleForm.thirdPartyData },
        };
      }
      await saveTenantPrivateConfigApi(data).then(res => {
        if (res.data.isSuccess === 1) {
          this.$notify({
            title: '成功',
            message: '恭喜！💐 保存成功',
            type: 'success',
          });
        } else {
          this.$notify.error({
            title: '失败 😭',
            message: `保存失败，${res.data.msg}`,
          });
        }
      });
      this.$emit('changeConfirmDialog', false);
      this.resetForm('ruleForm');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cacleHandle() {
      this.$emit('changeConfirmDialog', false);
      this.resetForm('ruleForm');
      console.log(this.ruleForm);
    },
    changeSletedType(type) {
      if (Number(type) === 1) {
        this.ruleForm.selectedType = {
          value: '1',
          label: '服务商用户',
        };
      } else {
        this.ruleForm.selectedType = {
          value: '2',
          label: '基础数据平台',
        };
      }
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 15px;
}
.title {
  margin-left: 30px;
}
</style>
