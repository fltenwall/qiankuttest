<template>
  <div class="container">
    <div class="header">
      <el-button type="primary">添加</el-button>
    </div>
    <div class="main">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="团队名称"> </el-table-column>
        <el-table-column prop="name" label="租户代码"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'codeReflection',
  data() {
    return {
      currentRow: null,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>
<style scoped>
.header{
  float: right;
  margin-right:50px;
}
</style>
