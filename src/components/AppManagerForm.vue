<template>
  <el-form ref="form" :model="form" label-width="120px" class="container" :rules="rules">
    <div class="typeDiv">
      <span>应用类型</span>
      <span class="type-left">
        <i class="el-icon-mobile-phone iconClass" ></i>
        <span>APP</span>
      </span>
      <span class="type-right">
        <i class="el-icon-s-platform iconClass" ></i>
        <span>PC</span>
      </span>
    </div>
    <!-- 最多6个字符 -->
    <el-form-item label="应用名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入应用名称"></el-input>
    </el-form-item>
    <!-- 不可编辑 -->
    <el-form-item label="应用用户" prop="apply_for">
      <el-radio-group v-model="form.apply_for" :disabled="disabledField.apply_for">
        <el-radio label="面向企业内部用户"></el-radio>
        <el-radio label="面向企业供应商与用户"></el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 默认否，不可编辑 -->
    <el-form-item label="是否客户专属" prop="is_exclusive">
      <el-radio-group v-model="form.is_exclusive" :disabled="disabledField.is_exclusive">
        <el-radio label="否"></el-radio>
        <el-radio label="是"></el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- APP是客户专属时，显示该字段，必填 -->
    <el-form-item label="租户代码" prop="tenant_code" v-if="form.is_exclusive === '是'">
      <el-input
        v-model="form.tenant_code"
        placeholder="请输入租户代码"
        :disabled="disabledField.tenant_code"
      ></el-input>
    </el-form-item>
    <!-- 应用图标 -->
    <el-form-item label="应用图标">
      <el-upload
        class="avatar-uploader"
        list-type="picture-card"
        action="https://manager-test.mypaas.com/app/index/upload-app-logo"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadImage"
        :on-preview="handlePictureCardPreview"
      >
        <img v-if="form.icon_url" :src="form.icon_url" class="avatar" />
        <i v-else class="el-icon-plus"></i>
      </el-upload>
      <span>尺寸大小：1024*1024 png/jpg/jpeg格式</span>
    </el-form-item>
    <!-- 必填，支持字母、数字、中划线，且中划线不能放在首尾，不能连续出现，全平台唯一，不可编辑-->
    <el-form-item label="应用编码" prop="app_code">
      <el-input
        v-model="form.app_code"
        :disabled="disabledField.app_code"
        placeholder="请输入应用编码，保存后不可更改"
      ></el-input>
    </el-form-item>
    <span class="promptWord">Android</span>
    <!-- 必填，反域名格式校验，不可编辑 -->
    <el-form-item label="包名" prop="android_id">
      <el-input
        v-model="form.android_id"
        :disabled="disabledField.android_id"
        placeholder="请输入包名，例如：com.mingyuanyun.demo"
      ></el-input>
    </el-form-item>
    <span class="promptWord">ios</span>
    <!-- 必填，反域名格式校验，不可编辑 -->
    <el-form-item label="BundleID" prop="ios_id" class="bundleID">
      <el-input
        v-model="form.ios_id"
        :disabled="disabledField.ios_id"
        placeholder="请输入BundleID，例如：com.mingyuanyun.demo"
      ></el-input>
    </el-form-item>
    <!-- 选定后不可更改，默认为AppStore -->
    <el-form-item label="发布方式" prop="ios_deploy_mod">
      <el-radio-group v-model="form.ios_deploy_mod" :disabled="disabledField.ios_deploy_mod">
        <el-radio label="AppStore"></el-radio>
        <el-radio label="In House"></el-radio>
      </el-radio-group>
      <br />
      <span class="publishPromptWord">{{ publishPromptWord }}</span>
    </el-form-item>
    <!-- 最大200字符 -->
    <el-form-item label="应用描述" prop="description">
      <el-input type="textarea" v-model="form.description" placeholder="请输入应用描述"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">{{
        this.newCreateAppLabel === true ? '立即创建' : '保存修改'
      }}</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getSingleAppInfo, createApplication, editSingleAppInfo } from '../api/appManagerApi';
import axios from 'axios';
export default {
  name: 'AppManagerForm',
  props: ['currentEditAppParams', 'createAppLabel'],
  data() {
    return {
      form: {
        name: '', // 应用名
        apply_for: '面向企业内部用户', // 适用用户 1：内部 2：外部
        is_exclusive: '否', // 是否专属应用 0：否 1：是
        tenant_code: '', // 专属应用租户代码，专属应用时必填
        app_code: '', // 应用编码
        android_id: '', // Android包名
        ios_id: '', // iOS Bundle ID
        ios_deploy_mod: 'AppStore', // iOS发布模式 1：上架包（默认） 2：企业包
        description: '', // 应用描述
        type: 'pc', // 应用类型 app(默认) pc
        icon_url: '',
        id: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入应用用户名称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度最大为6个字符', trigger: 'blur' },
        ],
        apply_for: [{ required: true, message: '请输入应用用户名称', trigger: 'blur' }],
        tenant_code: [{ required: true, message: '请输入租户代码', trigger: 'blur' }],
        app_code: [{ required: true, message: '请输入应用编码', trigger: 'blur' }],
        is_exclusive: [{ required: true, message: '请选择是否客户专属', trigger: 'change' }],
        android_id: [{ required: true, message: '输入包名', trigger: 'change' }],
        ios_id: [{ required: true, message: '请输入BundleID', trigger: 'change' }],
        // ios_deploy_mod: [{ required: true, message: '请选择发布方式', trigger: 'change' }],
        description: [{ max: 200, message: '长度最大为200个字符', trigger: 'blur' }],
      },
      disabledField: {
        apply_for: true,
        is_exclusive: true,
        tenant_code: true,
        app_code: true,
        android_id: true,
        ios_id: true,
        ios_deploy_mod: true,
      },

      newCurrentEditAppParams: this.currentEditAppParams,
      newCreateAppLabel: this.createAppLabel,

      dialogImageUrl: '',
    };
  },
  computed: {
    publishPromptWord: function () {
      return this.form.ios_deploy_mod === 'In House'
        ? 'In House方式指通过按照Appl的规范将ios安装包放置在自行建立的网站上，用户通过浏览网站自行下载安装的方式来安装应用。'
        : 'AppStore发布方式指应用分发到苹果应用商店，用户只能通过AppStore下载安装。该选项需要提前申请苹果开发者账号并将申请到的开发者证书上传到平台。';
    },
  },
  watch: {
    currentEditAppParams(newVal) {
      if (!newVal.type) {
        for (let key in this.form) {
          this.form[key] = '';
        }
        console.log(666);
        this.form.apply_for = '面向企业内部用户';
        this.form.is_exclusive = '否';
        this.form.ios_deploy_mod = 'AppStore';

        this.changeDisabledField();
        return;
      }
      this.newCurrentEditAppParams = newVal;
      this.initDataHandle();
    },
    createAppLabel(newVal) {
      this.newCreateAppLabel = newVal;
    },
  },
  methods: {
    async onSubmit(formName) {
      // 格式校验
      let isVaild = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 服务商代码做特殊校验
          isVaild = this.checkAppcode() === true && this.checkDescription() === true ? true : false;
        } else {
          this.notifyMessage('warning');
        }
      });
      if (isVaild) {
        this.form.description = this.form.description.trim();
        this.dataTypeTransformString();
        if (this.newCreateAppLabel) {
          // 新建
          if (this.form.is_exclusive === '0') this.form.tenant_code = '';
          let createResult = await createApplication(this.form);
          this.resultStatus(createResult);
        } else {
          // 编辑保存
          await this.editSave();
        }
      }
    },
    // 数据初始化处理
    async initDataHandle() {
      if (!this.newCurrentEditAppParams.type) {
        this.changeDisabledField();
        return;
      }
      const currentAPPInfo = await getSingleAppInfo(this.newCurrentEditAppParams);
      this.form = currentAPPInfo.data.data;
      this.dataTypeTransformLabel();
      console.log('form', currentAPPInfo);
    },
    // 字段形式转化
    dataTypeTransformLabel() {
      // 应用用户
      this.form.apply_for = Object.is(this.form.apply_for, '1') ? '面向企业内部用户' : '面向企业供应商与用户';
      // 是否客户专属
      this.form.is_exclusive = Object.is(this.form.is_exclusive, '0') ? '否' : '是';
      // 发布方式
      this.form.ios_deploy_mod = Object.is(this.form.ios_deploy_mod, '1') ? 'AppStore' : 'In House';
    },
    dataTypeTransformString() {
      // 应用用户
      this.form.apply_for = Object.is(this.form.apply_for, '面向企业内部用户') ? '1' : '2';
      // 是否客户专属
      this.form.is_exclusive = Object.is(this.form.is_exclusive, '否') ? '0' : '1';
      // 发布方式
      this.form.ios_deploy_mod = Object.is(this.form.ios_deploy_mod, 'AppStore') ? '1' : '2';
    },
    // 图片上传
    handleAvatarSuccess(res) {
      console.log('res', res);
      // this.form.icon_url = URL.createObjectURL(file.raw);
    },
    // 图片上传前的处理
    beforeAvatarUpload(file) {
      const isJPG = file.type in ['image/jpeg', 'image/jpg', 'image/png'];
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片格式只支持 JPG/PNG/JPEG 格式!');
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    changeDisabledField() {
      for (let key in this.disabledField) {
        this.disabledField[key] = false;
      }
    },
    // 消息通知类型
    notifyMessage(status, res) {
      switch (status) {
        case 'success':
          this.$notify({
            title: '操作成功！',
            message: '恭喜💐，操作成功了！😜',
            type: 'success',
          });
          break;
        case 'failure':
          this.$notify.error({
            title: '失败！',
            message: '抱歉😭，操作失败了！',
          });
          break;
        case 'warning':
          this.$notify({
            title: '校验未通过',
            message: '抱歉，校验未通过😞',
            type: 'warning',
          });
          break;
        case 'message':
          this.$notify.error({
            title: '失败！😱',
            message: `${res?.data?.msg}`,
          });
      }
    },
    resultStatus(res) {
      if (Number(res?.data?.code) === 0) {
        this.notifyMessage('success');
        this.$emit('getAllListData');
        this.$emit('changeDialogVisibleFalse');
      } else if (Number(res?.data?.code) === 400) {
        this.notifyMessage('message', res);
      } else {
        this.notifyMessage('failure');
      }
    },
    cancle() {
      this.$emit('changeDialogVisibleFalse');
    },
    // 图片上传
    async uploadImage(req) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const formdata = new FormData();
      formdata.append('__upfile__', req.file);
      axios
        .post('https://manager-test.mypaas.com/app/index/upload-app-logo', formdata, config)
        .then(res => {
          console.log('image upload succeed.');
          console.log('res', res);
          this.form.icon_url = res?.data.result;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
    },
    // 检查服务商代码
    checkAppcode() {
      if (!/^(?!-)[a-zA-Z0-9-]{1,}$/.exec(this.form.app_code)) {
        this.$notify.error({
          title: '失败 😭',
          message: '应用编码仅支持英文字母及中划线组合，且不能以中划线开头',
        });
        return false;
      } else {
        return true;
      }
    },
    checkDescription() {
      if (/\s{10}/.exec(this.form.description)) {
        this.$notify.error({
          title: '失败 😭',
          message: '请勿在应用描述中输出多个连续空格😡',
        });
        return false;
      } else {
        return true;
      }
    },
    // 编辑保存
    async editSave() {
      let params = {
        name: this.form.name,
        id: this.form.id,
        type: this.form.type,
        description: this.form.description,
        icon_url: this.form.icon_url,
      };
      let res = await editSingleAppInfo(params);
      this.resultStatus(res);
      this.$emit('changeCreateAppLabelTrue');
    },
  },
  async created() {
    this.initDataHandle();
  },
  mounted() {},
};
</script>

<style>
.container {
  width: 80%;
}

/* 图片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #409eff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/* 应用图标兼容性处理 */
input[type='file'] {
  display: none !important;
}

/* 发布方式提示文字 */
.publishPromptWord {
  font-size: 12px;
  display: inline-block;
  background-color: #f5f7fa;
  border-radius: 3px;
  padding: 0px 8px;
}

.promptWord {
  margin-left: 60px;
  color: #999999;
  margin-bottom: 20px;
}

.typeDiv {
  width : 70%;
  height: 120px;
  display: flex;
  flex-direction: row;
  margin-left: 35px;
  margin-bottom: 20px;
}
.type-left,
.type-right {
  flex: 1;
  display: inline-block;
  margin-left: 20px;
  font-size: 18px;
  border-radius: 4px;
  color: #0059DE;

  display: flex;
  flex-direction: column;
  border: 1px solid #DDDDDD;
  justify-content: center;
  align-items: center;
}

.iconClass {
  font-size: 30px;
  margin-bottom: 10px;
}

.type-left:hover,
.type-right:hover {
  border: 1px solid #0059DE;
}
</style>