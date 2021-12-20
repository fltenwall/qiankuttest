import { GET,POST } from './baseApi';

// 创建多端应用
const createApplication = (params = {
    name : '',
    apply_for : '',
    is_exclusive : false,
    tenant_code : '',
    icon_url : '',
    app_code : '',
    android_id : '',
    ios_id : '',
    ios_deploy_mod : 1,
    description : '',
    type : 'pc',
}) => {
    if (typeof params !== 'object') {
        params = {};
    }
    return POST('app/client/add', params);
};

// 获取多端应用列表
const getListData = () => {
    return GET('app/client/list');
};

// 获取单个应用详情
const getSingleAppInfo = (params = {
    id : '',
    type : 'pc',
}) => {
    if (typeof params !== 'object') {
        params = {};
    }
    return GET('app/client/detail', params);
};

// 编辑单个应用
const editSingleAppInfo = (params = {
    name : '',
    icon_url : '',
    description : '',
    id : '',
    type : '',
}) => {
    if (typeof params !== 'object') {
        params = {};
    }
    return POST('app/client/edit', params);
};

// 删除单个应用
const deleteSingleApp = (params = {
    id : '',
    type : '',
}) => {
    if (typeof params !== 'object') {
        params = {};
    }
    return POST('app/client/delete',  params);
};

export {
    createApplication,
    getListData,
    getSingleAppInfo,
    editSingleAppInfo,
    deleteSingleApp,
}