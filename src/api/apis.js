import { POST } from './baseApi';

// 获取区域接口
const getAreaList = () => {
  return POST('backend/tenant/get-area');
};

// 分页获取租户列表接口
const getTenantList = (params = { page: 1, pageSize: 10, areaId: 0, keyword: '' }) => {
  if (typeof params !== 'object') {
    params = { page: 1, pageSize: 10, areaId: 0, keyword: '' };
  }
  return POST('backend/tenant/get-tenant-list', params);
};

// 编辑/添加租户初始化接口
const editTenant = (params = { tenantId: 0 }) => {
  if (typeof params !== 'object') {
    params = { tenantId: 0 };
  }
  POST('backend/tenant/detail', params);
};

// 合同企业名称搜索接口
const searchTenant = (params = { keyword: '' }) => {
  if (typeof params !== 'object') {
    params = { keyword: '' };
  }
  return POST('backend/tenant/get-customers', params);
};

// 查询项目经理接口
const searchPm = (params = { keyword: '' }) => {
  if (typeof params !== 'object') {
    params = { keyword: '' };
  }
  return POST('backend/tenant/search-pm', params);
};

// 重发激活邮件
const sendMail = (params = { tenantId: '' }) => {
  if (typeof params !== 'object') {
    params = { tenantId: '' };
  }
  return POST('backend/tenant/send-mail', params);
};

// 编辑获取初始化数据
const getDetail = (params = { tenantId: '' }) => {
  if (typeof params !== 'object') {
    params = { tenantId: '' };
  }
  return POST('backend/tenant/get-tenant-detail', params);
};

// 编辑(新增)保存接口
const saveTenantInfo = (params = {}) => {
  return POST('/backend/tenant/save-tenant-info', params);
};

// 获取单个企业信息
const getCustomer = (params = { customerId: '' }) => {
  if (typeof params !== 'object') {
    params = { customerId: '' };
  }
  return POST('backend/tenant/get-customer', params);
};

// 服务商-租户关联列表分页查询
const getPartyList = (params = { tenantId: '', pageSize: '', page: '' }) => {
  if (typeof params !== 'object') {
    params = {};
  }
  return POST('backend/tenant/get-party-list', params);
};

//  新增、编辑服务商租户关联
const saveThirdParty = (
  params = {
    tenantId: '', //租户ID
    channelId: 0, //服务商ID
    channelName: '', //服务商名
    channelCode: '', //租户code  用户填写的
  }
) => {
  if (typeof params !== 'object') {
    params = {};
  }
  return POST('backend/tenant/save-third-party', params);
};

// 获取可选择的注册服务商接口
const getCanUseChannel = (params = { tenantId: 0 }) => {
  if (typeof params !== 'object') {
    params = {};
  }
  return POST('backend/tenant/get-can-use-channel', params);
};

// 新增、编辑服务商租户关联
const addThirdParty = (
  params = {
    tenantId: '', //租户ID
    channelId: 0, //服务商ID
    channelName: '', //服务商名
    channelCode: '', //租户code  用户填写的
    partyId: '',
  }
) => {
  if (typeof params !== 'object') {
    params = {};
  }
  return POST('backend/tenant/save-third-party', params);
};

// 同步数据
const doSyncParty = (params = { partyId: '', tenantId: '' }) => {
  if (typeof params !== 'object') {
    params = {};
  }
  return POST('backend/tenant/do-sync-party', params);
};

// 查询同步数据接口的执行状态
const getInitPg = (params = { partyId: '', tenantId: '' }) => {
  if (typeof params !== 'object') {
    params = {};
  }
  return POST('backend/tenant/get-init-pg', params);
};

// 设置主通讯录
const setAsMainParty = (
  params = {
    partyId: 0,
    tenantId: 0,
  }
) => {
  return POST('backend/tenant/set-as-main-party', params);
};

// 获取租户代码映射列表
const getTenantChannelMap = (
  data = {
    tenantId: '',
  }
) => {
  return POST('backend/tenant/get-tenant-channel-map', data);
};

// 删除租户代码映射
const delThirdParty = (
  data = {
    tenantId: '',
    partyId: '',
  }
) => {
  return POST('backend/tenant/del-third-party', data);
};

// 获取租户私有化配置
const getTenantPrivateConfig = (
  data = {
    tenantId: '',
  }
) => {
  return POST('backend/tenant/get-tenant-private-config', data);
};

// 保存租户私有化配置
const saveTenantPrivateConfig = (
  data = {
    tenantId: '', //租户ID
    channelType: 2, //企业通讯录类型 1服务商  2基础数据
    basicData: {
      //类型为基础数据时有此字段
      apiHost: '', //api域名
      apiKey: '', //应用id
      appSecret: '', //应用秘钥
    },
    thirdPartyData: {
      //服务商有此字段
      channelId: '',
    },
  }
) => {
  return POST('backend/tenant/save-tenant-private-config', data);
};

export {
  getAreaList,
  getTenantList,
  editTenant,
  searchTenant,
  searchPm,
  sendMail,
  getDetail,
  saveTenantInfo,
  getCustomer,
  getPartyList,
  saveThirdParty,
  getCanUseChannel,
  addThirdParty,
  doSyncParty,
  getInitPg,
  setAsMainParty,
  getTenantChannelMap,
  delThirdParty,
  getTenantPrivateConfig,
  saveTenantPrivateConfig,
};
