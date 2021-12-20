const axios = require('axios');
const BASEURL = window.location.href.split('/')[2] === 'manager.mypaas.com' ? 'https://manager.mypaas.com/' : 'https://manager-test.mypaas.com/';

const GET = function(url, params){
    return axios.get(`${BASEURL}${url}`, {params})
    .then(res => {return res})
    .catch(err => {throw new Error(err)});
};

const POST = function(url, params){
    return axios.post(`${BASEURL}${url}`, params)
    .then(res => {return res})
    .catch(err => {throw new Error(err)});
};

export {GET, POST};

