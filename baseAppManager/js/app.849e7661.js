(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["qiankuttest"]=t():e["qiankuttest"]=t()})(window,(function(){return function(e){function t(t){for(var n,s,o=t[0],l=t[1],c=t[2],u=0,d=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);p&&p(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={app:0},i=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp_qiankuttest"]=window["webpackJsonp_qiankuttest"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var p=l;return i.push([0,"chunk-vendors"]),a()}({0:function(e,t,a){e.exports=a("56d7")},"0bc9":function(e,t,a){},"1d76":function(e,t,a){"use strict";a("a14c")},"2e6e":function(e,t,a){"use strict";a("56f8")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ConfigManage")],1)},i=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tabs"},[a("el-tabs",{attrs:{"tab-position":"top",stretch:e.isStretch},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{staticClass:"tabs",attrs:{label:"管理员配置",name:"ManagerConfig"}}),a("el-tab-pane",{staticClass:"tabs",attrs:{label:"高危操作确认",name:"DangerConfirm"}}),a("el-tab-pane",{staticClass:"tabs",attrs:{label:"基础应用管理",name:"BaseAppManager"}})],1),e.controlShow.isManagerConfigShow?a("manager-config"):e._e(),e.controlShow.isBaseAppManagerShow?a("base-app-manager"):e._e(),e.controlShow.isDangerConfirmShow?a("danger-confirm"):e._e()],1)},o=[],l=(a("b0c0"),a("2b19"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"header"},[a("div",{staticClass:"header-left header-left-first"},[e._v("管理员配置")]),this.isRecord?a("div",{staticClass:"header-right"},[a("div",{staticClass:"header-right-title",on:{click:e.backToTable}},[a("span",{staticStyle:{color:"#cccccc",cursor:"pointer"}},[e._v(e._s(e.currentGroup))]),e._v(" > "),a("span",{staticStyle:{color:"#222222","font-weight":"600"}},[e._v("操作日志")])]),a("div",{staticClass:"header-right-search"},[a("el-input",{staticClass:"header-left-search",attrs:{"suffix-icon":"el-icon-search",placeholder:"搜索企业/代码/内容"},on:{change:e.search},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.downloadExcel()}}},[e._v("导出")])],1)]):a("div",{staticClass:"header-right"},[e._v(e._s(e.currentGroup))])]),a("div",{staticClass:"main"},[a("div",{staticClass:"main-left"},[a("div",{staticClass:"main-left-item",style:{background:e.styleObject.apps_super_admin.activeBackground,fontWeight:e.styleObject.apps_super_admin.fontWeight},on:{click:function(t){return e.getManagerList("apps_super_admin")}}},[a("i",{staticClass:"el-icon-user-solid icon-user",style:{color:e.styleObject.apps_super_admin.activeColor}}),e._v(" 企业管理后台超级管理员 ")]),a("div",{staticClass:"main-left-item",style:{background:e.styleObject.yzs_super_admin.activeBackground,fontWeight:e.styleObject.yzs_super_admin.fontWeight},on:{click:function(t){return e.getManagerList("yzs_super_admin")}}},[a("i",{staticClass:"el-icon-user-solid icon-user",style:{color:e.styleObject.yzs_super_admin.activeColor}}),e._v("管理后台超级管理员 ")]),a("div",{staticClass:"main-left-item",style:{background:e.styleObject.yzs_child_admin.activeBackground,fontWeight:e.styleObject.yzs_child_admin.fontWeight},on:{click:function(t){return e.getManagerList("yzs_child_admin")}}},[a("i",{staticClass:"el-icon-user-solid icon-user",style:{color:e.styleObject.yzs_child_admin.activeColor}}),e._v("管理后台子管理员 ")])]),this.isRecord?e._e():a("div",{staticClass:"main-right"},[a("el-table",{staticStyle:{width:"95%","font-size":"14px","line-height":"22px",color:"#222222","font-family":"PingFang SC","font-style":"normal","font-weight":"normal",margin:"0 auto"},attrs:{data:e.tableData,stripe:"","header-cell-style":{textAlign:"center",background:"#FBFBFB",fontSize:"14px",color:"#666666",fontWeight:"normal"},"cell-style":{padding:"16px",textAlign:"center"}}},[a("el-table-column",{attrs:{prop:"currentGroup",label:"管理组"}}),a("el-table-column",{attrs:{prop:"managerListString",label:"成员"}}),a("el-table-column",{attrs:{prop:"authMessage",label:"权限"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"wordColor",attrs:{type:"text",size:"small"},on:{click:function(a){return e.editManager(t.row)}}},[e._v("编辑成员")]),a("el-button",{staticClass:"wordColor",attrs:{type:"text"},on:{click:e.showRecord}},[e._v("查看日志")])]}}],null,!1,2961874626)})],1)],1),this.isRecord?a("div",{staticClass:"main-righ"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.recordList,"header-cell-style":{textAlign:"center",background:"#FBFBFB",fontSize:"14px",color:"#666666",fontWeight:"normal"}}},[a("el-table-column",{attrs:{label:"序号",type:"index",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s((e.currentPage-1)*e.pageSize+t.$index+1))])]}}],null,!1,2372993522)}),this.adminTypes.apps_super_admin?a("el-table-column",{attrs:{prop:"tenant_name",label:"企业",align:"center"}}):e._e(),a("el-table-column",{attrs:{prop:"user_name",label:"管理员",align:"center"}}),a("el-table-column",{attrs:{prop:"from",label:"模块",align:"center"}}),a("el-table-column",{attrs:{prop:"createtime",label:"时间",align:"center"}}),a("el-table-column",{attrs:{prop:"info",label:"操作内容",align:"center"}})],1),a("div",{staticClass:"main-right-page"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.pageTotalCount,background:""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e(),a("el-dialog",{attrs:{title:"编辑成员",visible:e.dialogVisible,width:"45%",closeOnClickModal:e.closeOnClickModal},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("ManagerConfigEdit",{ref:"editChild",attrs:{managerList:e.managerList,platformId:e.platformId}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn",on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.saveData}},[e._v("确 定")])],1)],1)],1)])}),c=[],p=a("2909"),u=a("1da1"),d=(a("96cf"),a("d81d"),a("4de4"),a("d3b7"),a("a9e3"),a("99af"),a("53ca")),f=a("bc3a"),g="".concat(window.location.origin,"/"),m=function(e,t){return f.post("".concat(g).concat(e),t).then((function(e){return e})).catch((function(e){throw new Error(e)}))},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{platformCode:""};return m("backend/manager/get-manager-detail",e)},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{platformId:1,list:[]};return m("backend/manager/save-multi-manager",e)},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{platformCode:"",curPage:1,keyword:""};return m("backend/manager/get-manager-log",e)},C=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("div",{staticClass:"left"},[a("div",{staticClass:"header"},[e._v(" 选择成员 ")]),a("div",{staticClass:"body"},[a("el-input",{staticClass:"header-left",attrs:{"suffix-icon":"el-icon-search",placeholder:"搜索姓名/账号"},on:{change:e.search},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}}),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","font-size":"14px","line-height":"22px",color:"#222222","font-family":"PingFang SC","font-style":"normal","font-weight":"normal","margin-top":"10px"},attrs:{"header-cell-style":{textAlign:"center",background:"#FBFBFB",fontSize:"14px",color:"#666666",fontWeight:"normal"},"cell-style":{textAlign:"center"},data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange,select:e.select}},[a("el-table-column",{attrs:{type:"selection"}}),a("el-table-column",{attrs:{prop:"username",label:"姓名"}}),a("el-table-column",{attrs:{prop:"usercode",label:"账号"}}),a("el-table-column",{attrs:{prop:"deptName",label:"部门"}})],1)],1)]),a("div",{staticClass:"right"},[a("div",{staticClass:"header"},[e._v("已选")]),e._l(this.selectedManagerList,(function(t,n){return a("div",{key:t.id,staticClass:"body"},[a("div",{staticClass:"item"},[a("span",[e._v(e._s(t.userName))]),a("i",{staticClass:"el-icon-delete",on:{click:function(t){return e.deleteUser(n)}}})])])}))],2)])},w=[],y=(a("159b"),a("a434"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{keyword:""};return"object"!==Object(d["a"])(e)&&(e={keyword:""}),m("backend/tenant/search-pm",e)}),_={name:"ManagerConfigEdit",props:["managerList","platformId"],data:function(){return{searchInput:"",tableData:[],multipleSelection:[],selectedManagerList:this.managerList,rows:[],tempObj:{},isCancelSelect:!0}},watch:{platformId:function(){this.selectedManagerList=this.managerList}},methods:{search:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""===e.searchInput){t.next=8;break}return t.next=3,y({keyword:e.searchInput}).then((function(t){e.tableData=t.data.data}));case 3:e.tempObj={},e.selectedManagerList.map((function(t){return e.tempObj[t.userCode]=t})),e.tableData.map((function(t){e.tempObj[t.usercode]&&e.$refs.multipleTable.toggleRowSelection(t,!0)})),t.next=9;break;case 8:e.tableData=[];case 9:case"end":return t.stop()}}),t)})))()},handleSelectionChange:function(e){var t=this;0===e.length?this.tableData.forEach((function(e){t.select([],e)})):e.map((function(e){t.tempObj[e.usercode]||(e.userName=e.username,e.userCode=e.usercode,t.selectedManagerList.push(e),t.tempObj[e.usercode]=e)}))},select:function(e,t){var a=e.filter((function(e){e.usercode,t.usercode}));if(0===a.length&&(this.isCancelSelect=!0),0===e.length&&(this.isCancelSelect=!0),this.isCancelSelect)for(var n=0;n<this.selectedManagerList.length;n++)if(this.selectedManagerList[n].userCode===t.usercode){delete this.tempObj[this.selectedManagerList[n].userCode],this.selectedManagerList.splice(n,1);break}},deleteUser:function(e){var t=this;this.tableData.map((function(a){var n;a.usercode===(null===(n=t.selectedManagerList[e])||void 0===n?void 0:n.userCode)&&(console.log(a.usercode,t.selectedManagerList[e].userCode),t.$refs.multipleTable.toggleRowSelection(a,!1),delete t.tempObj[a.usercode])})),this.selectedManagerList.splice(e,1)},clearSearchInput:function(){this.searchInput="",this.tableData=[]},save:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={platformId:Number(e.platformId),list:e.selectedManagerList},t.next=3,b(a);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()}}},k=_,x=(a("72d5"),a("2877")),S=Object(x["a"])(k,C,w,!1,null,"410eadde",null),A=S.exports,L={name:"ManagerConfig",components:{ManagerConfigEdit:A},data:function(){return{tableData:[],recordList:[],managerListString:"",managerList:[],currentGroup:"企业平台超级管理员",platformCode:"",currentGroupType:"apps_super_admin",platformId:0,isRecord:!1,currentPage:1,pageTotalCount:0,pageSize:10,currentAreaId:0,tabelIndex:1,isPageSizeChange:!1,searchInput:"",dialogVisible:!1,closeOnClickModal:!1,adminTypes:{apps_super_admin:!0,yzs_super_admin:!1,yzs_child_admin:!1},styleObject:{apps_super_admin:{activeColor:"#0059DE",activeBackground:"rgba(42, 106, 255, 0.1)",fontWeight:500},yzs_super_admin:{activeColor:"#0059DE",activeBackground:"rgba(42, 106, 255, 0.1)",fontWeight:500},yzs_child_admin:{activeColor:"#0059DE",activeBackground:"rgba(42, 106, 255, 0.1)",fontWeight:500}}}},computed:{},methods:{getManagerList:function(){var e=arguments,t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var n,r,i,s,o,l,c,u,d,f,g,m,b,v,C,w,y,_,k,x,S;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:for(y in w=e.length>0&&void 0!==e[0]?e[0]:"apps_super_admin",t.currentGroupType=w,t.adminTypes)y===w?(t.adminTypes[y]=!0,t.styleObject[y].activeBackground="rgba(42, 106, 255, 0.1)",t.styleObject[y].activeColor="#0059DE",t.styleObject[y].fontWeight=500):(t.adminTypes[y]=!1,t.styleObject[y].activeBackground="",t.styleObject[y].activeColor="#DDDDDD",t.styleObject[y].fontWeight="normal");return _={platformCode:w},a.next=6,h(_);case 6:k=a.sent,t.currentGroup=null===k||void 0===k||null===(n=k.data)||void 0===n||null===(r=n.data)||void 0===r||null===(i=r.currentGroup)||void 0===i?void 0:i.platformGroupName,t.managerListString="",t.platformCode=null===k||void 0===k||null===(s=k.data)||void 0===s||null===(o=s.data)||void 0===o||null===(l=o.currentGroup)||void 0===l?void 0:l.platformCode,null===k||void 0===k||null===(c=k.data)||void 0===c||null===(u=c.data)||void 0===u||u.userList.map((function(e){t.managerListString+="".concat(e.userName,", ")})),t.managerListString=t.managerListString.substr(0,t.managerListString.length-2),t.platformId=null===k||void 0===k||null===(d=k.data)||void 0===d||null===(f=d.data)||void 0===f||null===(g=f.currentGroup)||void 0===g?void 0:g.id,t.managerList=Object(p["a"])(null===k||void 0===k||null===(m=k.data)||void 0===m||null===(b=m.data)||void 0===b?void 0:b.userList),x=null===k||void 0===k||null===(v=k.data)||void 0===v||null===(C=v.data)||void 0===C?void 0:C.allGroup.filter((function(e){return e.platformCode===t.platformCode}))[0].platformDesc,S=[],S.push({managerListString:t.managerListString,currentGroup:t.currentGroup,authMessage:x}),t.tableData=S,t.isRecord=!1,t.currentPage=1;case 20:case"end":return a.stop()}}),a)})))()},backToTable:function(){this.isRecord=!1},showRecord:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i,s,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isRecord=!0,s={platformCode:e.platformCode,curPage:e.currentPage,keyword:""},t.next=4,v(s);case 4:o=t.sent,l=null===o||void 0===o||null===(a=o.data)||void 0===a||null===(n=a.data)||void 0===n?void 0:n.pageData,e.recordList=null===o||void 0===o||null===(r=o.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.list,e.pageTotalCount=Number(l.total);case 8:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var n,r,i,s,o,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.isPageSizeChange=!0,a.next=3,v({platformCode:t.platformCode,curPage:1,keyword:"",pageSize:e});case 3:o=a.sent,l=null===o||void 0===o||null===(n=o.data)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.pageData,t.recordList=null===o||void 0===o||null===(i=o.data)||void 0===i||null===(s=i.data)||void 0===s?void 0:s.list,t.pageTotalCount=Number(l.total),t.pageSize=e,t.currentPage=1,t.isPageSizeChange=!1;case 10:case"end":return a.stop()}}),a)})))()},handleCurrentChange:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var n,r,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!0!==t.isPageSizeChange){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,v({platformCode:t.platformCode,curPage:e,pageSize:t.pageSize,keyword:""});case 4:i=a.sent,t.recordList=null===i||void 0===i||null===(n=i.data)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.list,t.currentPage=e;case 7:case"end":return a.stop()}}),a)})))()},search:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,v({platformCode:e.platformCode,curPage:1,pageSize:e.pageSize,keyword:e.searchInput});case 2:s=t.sent,o=null===s||void 0===s||null===(a=s.data)||void 0===a||null===(n=a.data)||void 0===n?void 0:n.pageData,e.recordList=null===s||void 0===s||null===(r=s.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.list,e.pageTotalCount=Number(o.total),e.currentPage=1,e.searchInput="";case 8:case"end":return t.stop()}}),t)})))()},editManager:function(){this.dialogVisible=!0},downloadExcel:function(){window.open("".concat(g,"banner/yzs-admin/export?platform_code=").concat(this.platformCode))},saveData:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.editChild.save();case 2:if(a=t.sent,0!==a.data.code){t.next=11;break}return e.$notify({title:"成功",message:"恭喜💐，保存成功！😜",type:"success"}),t.next=7,e.getManagerList(e.currentGroupType);case 7:e.clearSearchInput(),e.dialogVisible=!1,t.next=12;break;case 11:e.$notify.error({title:"错误",message:"".concat(a.data.msg)});case 12:case"end":return t.stop()}}),t)})))()},clearSearchInput:function(){this.$refs.editChild.clearSearchInput()}},created:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getManagerList();case 2:case"end":return t.stop()}}),t)})))()}},M=L,D=(a("e709"),Object(x["a"])(M,l,c,!1,null,"2ec5b322",null)),j=D.exports,O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[e._m(0),a("div",{staticClass:"appContainer"},[e._l(e.appList,(function(t){return a("div",{key:t.appId,staticClass:"singleAppContainer"},[a("BaseAppManagerInfo",{attrs:{app:t,createAppLabel:e.createAppLabel},on:{getAppList:e.getAppList,changeDialogVisibleTrue:e.changeDialogVisibleTrue,changeCurrentEditAppParams:e.changeCurrentEditAppParams,changeCreateAppLabel:e.changeCreateAppLabelFalse,changeDialogVisibleFalse:e.changeDialogVisibleFalse,changeCreateAppLabelFalse:e.changeCreateAppLabelFalse}})],1)})),a("div",{staticClass:"addAppDiv",on:{click:e.addApp}},[a("i",{staticClass:"el-icon-plus plusClass"}),a("span",{staticClass:"plusClassWord"},[e._v("新建应用")])])],2),a("el-drawer",{attrs:{title:e.formTitle,visible:e.dialogVisible,size:"40%"},on:{"update:visible":function(t){e.dialogVisible=t},close:e.closeDialog}},[a("base-app-managerForm",{ref:"appForm",attrs:{currentEditAppParams:e.currentEditAppParams,createAppLabel:e.createAppLabel},on:{changeCurrentEditAppParams:e.changeCurrentEditAppParams,changeDialogVisibleFalse:e.changeDialogVisibleFalse,changeDialogVisibleTrue:e.changeDialogVisibleTrue,getAppList:e.getAppList,changeCreateAppLabelFalse:e.changeCreateAppLabelFalse,changeCreateAppLabelTrue:e.changeCreateAppLabelTrue}})],1)],1)},P=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header"},[a("span",{staticClass:"header_title"},[e._v("基础应用")])])}],T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"form",staticClass:"container item",attrs:{model:e.form,"label-width":"120px",rules:e.rules,"label-position":"left"}},[a("div",{staticClass:"typeDiv",attrs:{prop:"appType"}},[a("span",{staticClass:"type-name"},[e._v("应用类型")]),a("span",{staticClass:"type-left"},[a("i",{staticClass:"el-icon-s-platform iconClass"}),a("span",[e._v("PC站点")]),a("span",{staticClass:"type-left-selected"}),a("i",{staticClass:"el-icon-check type-left-check"})]),a("span",{staticClass:"type-right"},[a("span",{staticClass:"type-right-building"},[e._v("建设中")]),a("i",{staticClass:"el-icon-mobile-phone iconClass"}),a("span",{staticClass:"type-right-selected"},[e._v("APP")])])]),a("el-form-item",{attrs:{label:"应用名称",prop:"appName"}},[a("el-input",{attrs:{placeholder:"请输入应用名称"},model:{value:e.form.appName,callback:function(t){e.$set(e.form,"appName",t)},expression:"form.appName"}})],1),a("el-form-item",{staticClass:"bundleID",attrs:{label:"应用编码",prop:"appCode"}},[a("el-input",{attrs:{placeholder:"请输入应用编码",disabled:e.disabledField.appCode},model:{value:e.form.appCode,callback:function(t){e.$set(e.form,"appCode",t)},expression:"form.appCode"}})],1),a("el-form-item",{attrs:{label:"应用图标",prop:"icon"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{"list-type":"picture-card",action:this.uploadUrl,"show-file-list":!1,"before-upload":e.beforeAvatarUpload,"http-request":e.uploadImage,"on-preview":e.handlePictureCardPreview}},[e.form.icon?a("img",{staticClass:"avatar",attrs:{src:e.form.icon}}):a("i",{staticClass:"el-icon-plus"})]),a("span",{staticClass:"uploadWords"},[e._v("建议：640*640 不超过1M png格式")])],1),a("el-form-item",{staticClass:"bundleID",attrs:{label:"应用地址",prop:"appUrl"}},[a("el-input",{attrs:{placeholder:"请输入应用地址"},model:{value:e.form.appUrl,callback:function(t){e.$set(e.form,"appUrl",t)},expression:"form.appUrl"}})],1),a("el-form-item",{staticClass:"bundleID",attrs:{label:"回调地址",prop:"callbackUrl"}},[a("el-input",{attrs:{placeholder:"请输入回调地址"},model:{value:e.form.callbackUrl,callback:function(t){e.$set(e.form,"callbackUrl",t)},expression:"form.callbackUrl"}})],1),this.createAppLabel?e._e():a("el-form-item",{staticClass:"bundleID",attrs:{label:"AppSecret",prop:"appSecret"}},[a("el-input",{attrs:{placeholder:"请输入回调地址",disabled:e.disabledField.appSecret},model:{value:e.form.appSecret,callback:function(t){e.$set(e.form,"appSecret",t)},expression:"form.appSecret"}})],1),a("el-form-item",{attrs:{label:"应用描述",prop:"desc"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入应用描述"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),a("el-form-item",[a("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form")}}},[e._v(e._s(!0===this.newCreateAppLabel?"立即创建":"保存修改"))]),a("el-button",{on:{click:e.cancle}},[e._v("取消")])],1)],1)},I=[],F=(a("498a"),a("ac1f"),function(){return m("backend/app/get-base-app")}),R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{appId:0};return m("backend/app/get-base-app-detail",e)},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{appId:"",appName:"",icon:"",desc:"",appType:"",appCode:"",appUrl:"",callbackUrl:""};return m("backend/app/save-base-app",e)},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{appId:""};return m("backend/app/del-base-app",e)},E=a("bc3a"),B=a.n(E),U={name:"BaseAppManagerForm",props:["currentEditAppParams","createAppLabel"],data:function(){return{uploadUrl:"".concat(g,"app/index/upload-app-logo"),form:{isPcApp:!0,appId:"",appName:"",icon:"",desc:"",appType:1,appCode:"",appUrl:"",callbackUrl:""},newCurrentEditAppParams:this.currentEditAppParams,newCreateAppLabel:this.createAppLabel,disabledField:{appId:!0,appType:!0,appCode:!0,appSecret:!0},rules:{appName:[{required:!0,message:"请输入应用名称",trigger:"blur"},{min:1,max:10,message:"长度最大为10个字符",trigger:"blur"}],desc:[{max:200,message:"长度最大为200个字符",trigger:"blur"}],appCode:[{required:!0,message:"应用编码不能为空",trigger:"blur"}],icon:[{required:!0,message:"请上传应用图标",trigger:"blur"}]},dialogImageUrl:""}},watch:{currentEditAppParams:function(e){if(console.log(2323,e),this.changeDisabledFieldToTrue(),e.appId)this.newCurrentEditAppParams=e,this.initDataHandle();else{for(var t in this.form)this.form[t]="";this.changeDisabledField()}},createAppLabel:function(e){this.newCreateAppLabel=e,console.log(this.form)}},methods:{onSubmit:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=!1,t.$refs[e].validate((function(e){e?n=!0===t.checkUrlFormat()&&!0===t.checkDescription():t.notifyMessage("warning")})),!n){a.next=14;break}if(t.form.desc=t.form.desc.trim(),t.form.appType=1,!t.newCreateAppLabel){a.next=12;break}return a.next=8,$(t.form);case 8:r=a.sent,t.resultStatus(r),a.next=14;break;case 12:return a.next=14,t.editSave();case 14:case"end":return a.stop()}}),a)})))()},editSave:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={appId:e.form.appId,appName:e.form.appName,icon:e.form.icon,desc:e.form.desc,appType:e.form.appType,appCode:e.form.appCode,appUrl:e.form.appUrl,callbackUrl:e.form.callbackUrl},t.next=3,$(a);case 3:n=t.sent,e.resultStatus(n),e.$emit("changeCreateAppLabelTrue");case 6:case"end":return t.stop()}}),t)})))()},resultStatus:function(e){var t,a;0===Number(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.code)?(this.notifyMessage("success"),this.$emit("getAppList"),this.$emit("changeDialogVisibleFalse"),this.changeDisabledFieldToTrue()):""!==(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.msg.length)?this.notifyMessage("message",e):this.notifyMessage("failure")},notifyMessage:function(e,t){var a;switch(e){case"success":this.$notify({title:"操作成功！",message:"恭喜💐，操作成功了！😜",type:"success"});break;case"failure":this.$notify.error({title:"失败！",message:"抱歉😭，操作失败了！"});break;case"warning":this.$notify({title:"校验未通过",message:"抱歉，校验未通过😞",type:"warning"});break;case"message":this.$notify.error({title:"失败！😱",message:"".concat(null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.msg)})}},checkUrlFormat:function(){var e=/^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/;return!(0!==this.form.appUrl.length&&!e.exec(this.form.appUrl)||0!==this.form.callbackUrl.length&&!e.exec(this.form.callbackUrl))||(this.$notify.error({title:"失败 😭",message:"不符合域名格式"}),!1)},checkDescription:function(){return!/\s{10}/.exec(this.form.desc)||(this.$notify.error({title:"失败 😭",message:"请勿在应用描述中输出多个连续空格😡"}),!1)},initDataHandle:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.newCurrentEditAppParams.appId){t.next=3;break}return e.changeDisabledField(),t.abrupt("return");case 3:return t.next=5,R(e.newCurrentEditAppParams);case 5:r=t.sent,e.form=null===r||void 0===r||null===(a=r.data)||void 0===a||null===(n=a.data)||void 0===n?void 0:n.info,console.log(666,e.form);case 8:case"end":return t.stop()}}),t)})))()},beforeAvatarUpload:function(e){var t=e.size/640/640<1;return t||this.$message.error("图片大小不能超过 1MB!"),t},uploadImage:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n={headers:{"Content-Type":"multipart/form-data"}},r=new FormData,r.append("__upfile__",e.file),B.a.post(t.uploadUrl,r,n).then((function(e){Object.is(e.data.isSuccess,!1)?t.$notify.error({title:"上传失败😭",message:"".concat(e.data.message)}):(t.$notify.success({title:"恭喜💐，上传成功！😜",message:"图片上传成功"}),t.form.icon=null===e||void 0===e?void 0:e.data.result)})).catch((function(e){console.log(e.message)}));case 4:case"end":return a.stop()}}),a)})))()},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url},changeDisabledField:function(){for(var e in this.disabledField)this.disabledField[e]=!1},changeDisabledFieldToTrue:function(){for(var e in this.disabledField)this.disabledField[e]=!0},cancle:function(){this.$emit("changeDialogVisibleFalse"),this.changeDisabledFieldToTrue()},formCloseDialog:function(){this.$refs.form.resetFields()}},created:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.initDataHandle();case 1:case"end":return t.stop()}}),t)})))()}},V=U,N=(a("1d76"),Object(x["a"])(V,T,I,!1,null,null,null)),W=N.exports,G=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Container",on:{mouseenter:e.editMouseenter,mouseleave:e.editMouseleave}},[a("div",{staticClass:"main"},[a("div",{directives:[{name:"show",rawName:"v-show",value:this.editMore,expression:"this.editMore"}],staticClass:"main-edit-icon"},[a("el-popover",{attrs:{placement:"right",width:"50",trigger:"hover"}},[a("i",{staticClass:"el-icon-more",attrs:{slot:"reference"},on:{click:e.showButton},slot:"reference"}),a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:e.editApp}},[e._v("编辑")]),a("br"),a("el-button",{attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("删除")])],1)],1),a("el-dialog",{attrs:{title:this.dialogTitle,visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",[e._v("删除应用后相关数据将会全部删除，且不可恢复！")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"danger"},on:{click:e.deleteAppFunc}},[e._v("删除")])],1)]),a("div",{staticClass:"main-left"},[a("img",{attrs:{src:this.app.icon,alt:""}})]),a("div",{staticClass:"main-right"},[a("div",{staticClass:"main-right-title"},[e._v(e._s(this.app.appName)+" "),this.app.isPcApp?a("i",{staticClass:"el-icon-s-platform icon-mobile"}):e._e(),this.app.isPcApp?e._e():a("i",{staticClass:"el-icon-mobile-phone icon-mobile"})]),a("div",{staticClass:"main-right-message"},[e._v("基础应用")])])],1),a("div",{staticClass:"footer"},[a("el-tooltip",{attrs:{effect:"dark",content:this.app.desc,placement:"bottom-end",disabled:e.dscriptionShow}},[a("span",{staticClass:"main-dscription"},[e._v("应用描述："+e._s(this.app.desc))])])],1)])},q=[],H={name:"BaseAppManagerInfo",props:["app"],data:function(){return{visible:!1,dialogVisible:!1,editMore:!1,dialogTitle:"确认删除".concat(this.app.appName,"？")}},computed:{dscriptionShow:function(){return!(this.app.desc.length>12)}},methods:{showButton:function(){this.visible=!0},editApp:function(){this.$emit("changeCreateAppLabelFalse"),this.$emit("changeDialogVisibleTrue"),this.$emit("changeCurrentEditAppParams",{appId:this.app.appId}),this.visible=!1},deleteAppFunc:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,z({appId:e.app.appId});case 2:a=t.sent,0===a.data.code?(e.$message({title:"删除失败，请重试😢",message:"删除执行成功😁",type:"success"}),e.$emit("getAppList")):e.$notify.error({title:"删除失败，请重试😢",message:"删除失败，请重试"}),e.visible=!1,e.dialogVisible=!1;case 6:case"end":return t.stop()}}),t)})))()},editMouseenter:function(){this.editMore=!0},editMouseleave:function(){this.editMore=!1}}},J=H,K=(a("e293"),Object(x["a"])(J,G,q,!1,null,"49e58aa4",null)),Q=K.exports,X={name:"BaseAppManager",data:function(){return{appList:[],dialogVisible:!1,currentEditAppParams:{},createAppLabel:!0}},computed:{formTitle:function(){return!0===this.createAppLabel?"新建应用":"编辑应用"}},components:{BaseAppManagerForm:W,BaseAppManagerInfo:Q},methods:{getAppList:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,F();case 2:r=t.sent,e.appList=null===r||void 0===r||null===(a=r.data)||void 0===a||null===(n=a.data)||void 0===n?void 0:n.list;case 4:case"end":return t.stop()}}),t)})))()},changeDialogVisibleTrue:function(){this.dialogVisible=!0},changeDialogVisibleFalse:function(){this.dialogVisible=!1},addApp:function(){this.dialogVisible=!0,this.currentEditAppParams={},this.changeCreateAppLabelTrue()},changeCreateAppLabelFalse:function(){this.createAppLabel&&(this.createAppLabel=!1)},changeCreateAppLabelTrue:function(){this.createAppLabel||(this.createAppLabel=!0)},changeCurrentEditAppParams:function(e){this.currentEditAppParams=e},closeDialog:function(){this.$refs.appForm.formCloseDialog()}},created:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getAppList();case 2:case"end":return t.stop()}}),t)})))()}},Y=X,Z=(a("b083"),Object(x["a"])(Y,O,P,!1,null,"38eec1c4",null)),ee=Z.exports,te=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"})},ae=[],ne=(a("2e6e"),{}),re=Object(x["a"])(ne,te,ae,!1,null,"93577ef6",null),ie=re.exports,se={name:"ConfigManage",components:{ManagerConfig:j,BaseAppManager:ee,DangerConfirm:ie},data:function(){return{activeName:"ManagerConfig",isStretch:!0,controlShow:{isManagerConfigShow:!0,isBaseAppManagerShow:!1,isDangerConfirmShow:!1}}},methods:{handleClick:function(e,t){switch(console.log(e,t),e.name){case"ManagerConfig":this.controlComponentShow("isManagerConfigShow");break;case"BaseAppManager":this.controlComponentShow("isBaseAppManagerShow");break;case"DangerConfirm":this.controlComponentShow("isDangerConfirmShow");break;default:this.controlComponentShow("isManagerConfigShow")}},controlComponentShow:function(e){for(var t in this.controlShow)this.controlShow[t]=Object.is(t,e);console.log(this.controlShow)}}},oe=se,le=(a("8dc7"),Object(x["a"])(oe,s,o,!1,null,null,null)),ce=le.exports,pe={name:"App",components:{ConfigManage:ce}},ue=pe,de=Object(x["a"])(ue,r,i,!1,null,null,null),fe=de.exports,ge=(a("0fae"),a("5c96")),me=a.n(ge);n["default"].config.productionTip=!1,n["default"].use(me.a),new n["default"]({el:"#app",render:function(e){return e(fe)}})},"56f8":function(e,t,a){},"644c":function(e,t,a){},"72d5":function(e,t,a){"use strict";a("644c")},7887:function(e,t,a){},"8dc7":function(e,t,a){"use strict";a("c4e7")},a14c:function(e,t,a){},b083:function(e,t,a){"use strict";a("7887")},c4e7:function(e,t,a){},e293:function(e,t,a){"use strict";a("e7dc")},e709:function(e,t,a){"use strict";a("0bc9")},e7dc:function(e,t,a){}})}));
//# sourceMappingURL=app.849e7661.js.map