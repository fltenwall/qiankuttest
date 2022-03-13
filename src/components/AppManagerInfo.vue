<template>
  <div class="Container" @mouseenter="editMouseenter" @mouseleave="editMouseleave">
    <div class="main">
      <div class="main-edit-icon" v-show="this.editMore">
        <el-popover placement="right" width="50" trigger="hover">
          <i class="el-icon-more" @click="showButton" slot="reference"> </i>
          <el-button type="text" icon="el-icon-edit" @click="editApp">编辑</el-button>
          <br />
          <el-button type="text" icon="el-icon-delete" @click="dialogVisible = true">删除</el-button>
        </el-popover>
      </div>
      <el-dialog :title="this.dialogTitle" :visible.sync="dialogVisible" width="30%">
        <span>删除APP后相关数据将会全部删除，且不可恢复！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="deleteApp">删除</el-button>
        </span>
      </el-dialog>
      <div class="main-left">
        <img :src="this.appIconUrl" alt="" />
      </div>
      <div class="main-right">
        <div class="main-right-title">{{ this.appTitle }} <i class="el-icon-mobile-phone icon-mobile"></i></div>
        <div class="main-right-message">{{ this.appApplyFor === '1' ? '企业内部用户' : '企业供应商客户' }}</div>
        <div class="main-right-label">
          <span class="main-right-label-words">{{ this.appInfo.is_exclusive ? '客户专属' : '非客户专属' }}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-tooltip effect="dark" :content="this.appDescription" placement="bottom-end" :disabled="dscriptionShow">
        <span class="main-dscription">应用描述：{{ this.appDescription }}</span>
      </el-tooltip>
      
    </div>
  </div>
</template>

<script>
import { deleteSingleApp } from '../api/appManagerApi';
export default {
  name: 'AppManagerInfo',
  props: ['appTitle', 'appApplyFor', 'appIconUrl', 'appDescription', 'appId', 'appType', 'appInfo', 'createAppLabel'],
  data() {
    return {
      visible: false,
      dialogVisible: false,
      editMore: false,
      dialogTitle: `确认删除 ${this.appTitle} APP？`,
    };
  },
  computed :{
    dscriptionShow(){
      return this.appDescription.length > 20 ? false : true;
    }
  },
  methods: {
    showButton() {
      this.visible = true;
    },
    editApp() {
      this.$emit('changeCreateAppLabelFalse');
      this.$emit('changeDialogVisibleTrue');
      this.$emit('changeCurrentEditAppParams', { id: this.appId, type: this.appType });
      this.visible = false;
    },
    // 删除应用
    async deleteApp() {
      const res = await deleteSingleApp({ id: this.appId, type: this.appType });
      if (res.data.code === 0) {
        this.$message({
          title: '删除失败，请重试😢',
          message: '删除执行成功😁',
          type: 'success',
        });
        this.$emit('getAllListData');
      } else {
        this.$notify.error({
          title: '删除失败，请重试😢',
          message: '删除失败，请重试',
        });
      }
      this.visible = false;
      this.dialogVisible = false;
    },
    editMouseenter() {
      this.editMore = true;
    },
    editMouseleave() {
      this.editMore = false;
    },
  },
};
</script>

<style scoped>
.Container {
  height: 200px;
  box-shadow: 0px 2px 8px rgba(100, 101, 102, 0.2);
  /* width: 40%; */
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  font-size: 14px;
}

.Container:hover {
  box-shadow: 0px 2px 8px rgba(100, 101, 102, 0.6);
}
.main {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;

  position: relative;
}

.icon-mobile {
  font-size: 18px;
  color: #0059de;
}

.main-right-title {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #222222;
}

.main-edit-icon {
  position: absolute;
  right: 10px;
  top: -10px;
  /* opacity: 0; */
}

.main-left {
  flex: 2;
}

.main-left img {
  width: 60%;
}

.main-right {
  flex: 3;
}

.footer {
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}


.main-right-label {
  /* margin: 8px 0; */
}
.main-right-label-words {
  display: inline-block;
  color: #0059de;
  border-radius: 2px;
  border-radius: 5px;
  padding: 4px;
  background-color: #e6f4ff;
  margin: 5px 0;
}
.main-right-message {
  margin: 8px 0;
}
.main-right-message,
.main-dscription {
  color: #999999;
  word-break: normal;
  width: auto;
  display: block;
  white-space: nowrap;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 40px;
}

/* .main-dscription :hover {
  overflow: visible;
} */
</style>