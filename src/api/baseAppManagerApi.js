import { POST } from './baseApi';

// 获取所有的基础应用
const getBaseApp = () => {
  return POST('backend/app/get-base-app');
};

// 获取应用详情
const getBaseAppDetail = (
  params = {
    appId: 0, // 应用ID
  }
) => {
  return POST('backend/app/get-base-app-detail', params);
};

// 新增or编辑应用信息
const saveBaseApp = (
  params = {
    appId: '', //根据此参数是否非空判断是新增或者编辑，无则新增有则编辑
    appName: '', //非空
    icon: '', //非空
    desc: '', //应用介绍
    appType: '', //1PC应用  2移动应用  非空
    appCode: '', //应用编码   非空
    appUrl: '', //应用地址
    callbackUrl: '', //回调地址
  }
) => {
    return POST('backend/app/save-base-app', params);
};

// 删除基础应用
const delBaseApp = (
    params = {
        appId: '' //应用ID，非空
    }
) => {
    return POST('backend/app/del-base-app', params);
}

export { 
    getBaseApp, 
    getBaseAppDetail,
    saveBaseApp,
    delBaseApp,
};
