<template>
  <el-form ref="form" :model="form" label-width="120px" class="container item" :rules="rules" label-position="left">
    <div class="typeDiv" prop="appType">
      <span class="type-name">应用类型</span>
      <span class="type-left">
        <i class="el-icon-s-platform iconClass"></i>
        <span>PC站点</span>
        <span class="type-left-selected"></span>
        <i class="el-icon-check type-left-check"></i>
      </span>
      <span class="type-right">
        <span class="type-right-building">建设中</span>
        <i class="el-icon-mobile-phone iconClass"></i>
        <span class="type-right-selected">APP</span>
      </span>
    </div>
    <!-- 最多6个字符 -->
    <el-form-item label="应用名称" prop="appName">
      <el-input v-model="form.appName" placeholder="请输入应用名称"></el-input>
    </el-form-item>
    <!-- 应用编码，不可编辑 -->
    <el-form-item label="应用编码" prop="appCode" class="bundleID">
      <el-input v-model="form.appCode" placeholder="请输入应用编码" :disabled="disabledField.appCode"></el-input>
    </el-form-item>
    <!-- 应用图标 -->
    <el-form-item label="应用图标" prop="icon">
      <el-upload
        class="avatar-uploader"
        list-type="picture-card"
        :action="this.uploadUrl"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadImage"
        :on-preview="handlePictureCardPreview"
      >
        <img v-if="form.icon" :src="form.icon" class="avatar" />
        <i v-else class="el-icon-plus"></i>
      </el-upload>
      <span class="uploadWords">建议：640*640 不超过1M png格式</span>
    </el-form-item>

    <!-- 应用地址，域名格式校验 -->
    <el-form-item label="应用地址" prop="appUrl" class="bundleID">
      <el-input v-model="form.appUrl" placeholder="请输入应用地址"></el-input>
    </el-form-item>
    <!-- 回调地址，域名格式校验 -->
    <el-form-item label="回调地址" prop="callbackUrl" class="bundleID">
      <el-input v-model="form.callbackUrl" placeholder="请输入回调地址"></el-input>
    </el-form-item>

    <el-form-item label="AppSecret" prop="appSecret" class="bundleID" v-if="!this.createAppLabel">
      <el-input v-model="form.appSecret" placeholder="请输入回调地址" :disabled="disabledField.appSecret"></el-input>
    </el-form-item>
    <!-- 最大200字符 -->
    <el-form-item label="应用描述" prop="desc">
      <el-input type="textarea" v-model="form.desc" placeholder="请输入应用描述"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')" class="btn">{{
        this.newCreateAppLabel === true ? '立即创建' : '保存修改'
      }}</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getBaseAppDetail, saveBaseApp } from '../api/baseAppManagerApi';
import { BASEURL } from './../api/baseApi';
import axios from 'axios';
export default {
  name: 'BaseAppManagerForm',
  props: ['currentEditAppParams', 'createAppLabel'],
  data() {
    return {
      uploadUrl: `${BASEURL}app/index/upload-app-logo`,
      form: {
        isPcApp: true,
        appId: '', //应用ID，根据此参数是否非空判断是新增或者编辑，无则新增有则编辑
        appName: '', //应用名称，非空
        icon: '', //应用图标，非空
        desc: '', //应用介绍
        appType: 1, //应用类型，1PC应用  2移动应用  非空
        appCode: '', //应用编码   非空
        appUrl: '', //应用地址
        callbackUrl: '', //回调地址
      },
      newCurrentEditAppParams: this.currentEditAppParams,
      newCreateAppLabel: this.createAppLabel,
      disabledField: {
        appId: true,
        appType: true,
        appCode: true,
        appSecret: true,
      },
      rules: {
        appName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度最大为10个字符', trigger: 'blur' },
        ],
        desc: [{ max: 200, message: '长度最大为200个字符', trigger: 'blur' }],
        appCode: [{ required: true, message: '应用编码不能为空', trigger: 'blur' }],
        icon: [{ required: true, message: '请上传应用图标', trigger: 'blur' }],
      },
      dialogImageUrl: '',
    };
  },
  watch: {
    currentEditAppParams(newVal) {
      console.log(2323, newVal);
      this.changeDisabledFieldToTrue();
      if (!newVal.appId) {
        for (let key in this.form) {
          this.form[key] = '';
        }
        this.changeDisabledField();
        return;
      }
      this.newCurrentEditAppParams = newVal;
      this.initDataHandle();
    },
    createAppLabel(newVal) {
      this.newCreateAppLabel = newVal;
      console.log(this.form);
    },
  },
  methods: {
    async onSubmit(formName) {
      // 格式校验
      let isVaild = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          isVaild = this.checkUrlFormat() === true && this.checkDescription() === true ? true : false;
        } else {
          this.notifyMessage('warning');
        }
      });
      if (isVaild) {
        this.form.desc = this.form.desc.trim();
        this.form.appType = 1;
        // this.dataTypeTransformString();
        if (this.newCreateAppLabel) {
          // 新建
          let createResult = await saveBaseApp(this.form);
          this.resultStatus(createResult);
        } else {
          // 编辑保存
          await this.editSave();
        }
        // this.dataTypeTransformLabel();
      }
    },
    // 编辑保存
    async editSave() {
      let params = {
        appId: this.form.appId, //根据此参数是否非空判断是新增或者编辑，无则新增有则编辑
        appName: this.form.appName, //非空
        icon: this.form.icon, //非空
        desc: this.form.desc, //应用介绍
        appType: this.form.appType, //1PC应用  2移动应用  非空
        appCode: this.form.appCode, //应用编码   非空
        appUrl: this.form.appUrl, //应用地址
        callbackUrl: this.form.callbackUrl, //回调地址
      };
      let res = await saveBaseApp(params);
      this.resultStatus(res);
      this.$emit('changeCreateAppLabelTrue');
    },
    resultStatus(res) {
      if (Number(res?.data?.code) === 0) {
        this.notifyMessage('success');
        this.$emit('getAppList');
        this.$emit('changeDialogVisibleFalse');
        this.changeDisabledFieldToTrue();
      } else if (res?.data?.msg.length !== '') {
        this.notifyMessage('message', res);
      } else {
        this.notifyMessage('failure');
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
    checkUrlFormat() {
      const reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/;
      if (
        (this.form.appUrl.length !== 0 && !reg.exec(this.form.appUrl)) ||
        (this.form.callbackUrl.length !== 0 && !reg.exec(this.form.callbackUrl))
      ) {
        this.$notify.error({
          title: '失败 😭',
          message: '不符合域名格式',
        });
        return false;
      } else {
        return true;
      }
    },
    checkDescription() {
      if (/\s{10}/.exec(this.form.desc)) {
        this.$notify.error({
          title: '失败 😭',
          message: '请勿在应用描述中输出多个连续空格😡',
        });
        return false;
      } else {
        return true;
      }
    },
    // 数据初始化处理
    async initDataHandle() {
      if (!this.newCurrentEditAppParams.appId) {
        this.changeDisabledField();
        return;
      }

      const currentAPPInfo = await getBaseAppDetail(this.newCurrentEditAppParams);

      this.form = currentAPPInfo?.data?.data?.info;
      console.log(666, this.form);
      // this.dataTypeTransformLabel();
    },
    // 图片上传前的处理
    beforeAvatarUpload(file) {
      // const isJPG = ['image/png'].indexOf(file.type);
      const isLt2M = file.size / 640 / 640 < 1;

      // if (isJPG === -1) {
      //   this.$message.error('上传头像图片格式只支持 PNG 格式!');
      //   return;
      // }

      if (!isLt2M) {
        this.$message.error('图片大小不能超过 1MB!');
      }
      return isLt2M;
    },
    // 图片上传
    async uploadImage(req) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const formdata = new FormData();
      formdata.append('__upfile__', req.file);
      axios
        .post(this.uploadUrl, formdata, config)
        .then(res => {
          if (Object.is(res.data.isSuccess, false)) {
            this.$notify.error({
              title: '上传失败😭',
              message: `${res.data.message}`,
            });
          } else {
            this.$notify.success({
              title: '恭喜💐，上传成功！😜',
              message: '图片上传成功',
            });
            this.form.icon = res?.data.result;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
    },
    changeDisabledField() {
      for (let key in this.disabledField) {
        this.disabledField[key] = false;
      }
    },
    changeDisabledFieldToTrue() {
      for (let key in this.disabledField) {
        this.disabledField[key] = true;
      }
    },
    cancle() {
      this.$emit('changeDialogVisibleFalse');
      this.changeDisabledFieldToTrue();
    },
    formCloseDialog() {
      this.$refs.form.resetFields();
    },
  },
  async created() {
    this.initDataHandle();
  },
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
  line-height: 24px;
  color: #999999;
}

.promptWord {
  color: #999999;
  margin-bottom: 20px;
}

.typeDiv {
  width: 80%;
  height: 120px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.type-name {
  width: 120px;
  color: #222222;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}
.type-left,
.type-right {
  flex: 1;
  display: inline-block;
  font-size: 18px;
  border-radius: 3px;
  color: #0059de;

  display: flex;
  flex-direction: column;
  border: 1px solid #dddddd;
  justify-content: center;
  align-items: center;
}

.type-left {
  position: relative;
}

.type-left-selected {
  position: absolute;
  right: 0;
  bottom: 0;
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #0059de;
  border-radius: 30px 0 0 0;
}

.type-left-check {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #ffffff;
}

.type-right {
  color: #8c939d;
  position: relative;
  margin-left: 30px;
}

.type-right-building {
  position: absolute;
  background-color: #0059de;
  right: 0px;
  top: 0px;
  color: #f5f7fa;
  font-size: 14px;
  border-radius: 3px;
  padding: 4px;
}

.type-right-selected {
}

.iconClass {
  font-size: 30px;
  margin-bottom: 10px;
}

.type-left {
  border: 1px solid #0059de;
}

/* .type-left:hover {
  border: 1px solid #0059DE;
} */

.btn {
  background: #0059de !important;
  border-radius: 3px !important;
  color: #ffffff !important;
  font-size: 14px !important;
  font-family: PingFang SC !important;
  font-style: normal !important;
  font-weight: normal !important;
}

.uploadWords {
  color: #999999;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}

.item .el-form-item__label {
  color: #222222;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}

.el-radio__label {
  color: #222222 !important;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #0059de !important;
  background: #0059de !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #cccccc !important;
  border-radius: 3px !important;
}
</style>