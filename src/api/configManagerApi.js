import { POST } from './baseApi';

// 获取管理员信息
const getManagerDetail = (
  params = {
    platformCode: '',
  }
) => {
  return POST('backend/manager/get-manager-detail', params);
};

// 获取管理员授权用户明细
const editManagerInit = (
  params = {
    platformId: 0, //管理员类型值，通过上面接口获取
    keyword: '',
  }
) => {
  return POST('backend/manager/edit-manager-init', params);
};

// 新增管理员
const saveManager = (
  params = {
    userName: '',
    userCode: '',
    deptName: '',
    platformId: 1,
  }
) => {
  return POST('backend/manager/save-manager', params);
};

// 批量保存
const saveMultiManager = (
  params = {
    platformId: 1,
    list: [],
  }
) => {
  return POST('backend/manager/save-multi-manager', params);
}

// 删除管理员
const delManager = (
  params = {
    id: 0,
  }
) => {
  return POST('backend/manager/get-manager-log', params);
};
// 获取管理员日志
const getManagerLog = (
  params = {
    "platformCode":"",
    "curPage": 1,
    "keyword": '',
  }
) => {
  return POST('backend/manager/get-manager-log', params);
}

// 查询项目经理接口
const searchPm = (params = { keyword: '' }) => {
  if (typeof params !== 'object') {
    params = { keyword: '' };
  }
  return POST('backend/tenant/search-pm', params);
};


export {
  getManagerDetail,
  editManagerInit,
  saveManager,
  saveMultiManager,
  delManager,
  getManagerLog,
  searchPm,
};
