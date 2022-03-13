const axios = require('axios');
const BASEURL = `${window.location.origin}/`;

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

export {GET, POST, BASEURL};

