const axios = require('axios');
const BASEURL = `${window.location.origin}/`;


// const BASEURL = '/';
const $axios = axios.create({
    baseURL: BASEURL,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
})
const GET = function(url, params){
    return $axios.get(`${url}`, {params})
    .then(res => {return res})
    .catch(err => {throw new Error(err)});
};

const POST = function(url, params){
    return $axios.post(`${url}`, params)
    .then(res => {return res})
    .catch(err => {throw new Error(err)});
};

export {GET, POST, BASEURL};

