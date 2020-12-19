<template>
<div>
  <el-table
    :data="currentPageContents"
    style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="title" label="题目" width="180"></el-table-column>
    <el-table-column prop="category" label="类别"></el-table-column>
    <el-table-column prop="authors" label="作者"></el-table-column>
    <el-table-column prop="abstract" label="摘要"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleDetail(scope.$index)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :current-page.sync="currentPage"
    :page-size="pageSize"
    @current-change="onCurrentChange"
    layout="prev, pager, next"
    :total="tableData.length">
  </el-pagination>
</div>
</template>
 
<script>
export default {
  name: "articlelist",
  props: {
    tableData: Array
  },
  data() {
    return {     
      pageIndex: 0,
      currentPage:1,
      pageSize: 3
    };
  },
  computed: {
    currentPageContents(){
      let st = this.pageIndex * this.pageSize;
      let ed = Math.min(st + this.pageSize, this.tableData.length);
      return this.tableData.slice(st, ed);
    }
  },
  methods: {
    onCurrentChange(val) {
      this.pageIndex = val-1;
    },
    handleDetail(idx) {
      idx = idx + this.pageIndex * this.pageSize;
      let briefDat = this.tableData[idx]
      this.$router.push({path: 'article', query: {aid: briefDat['aid']}})
    }
  }
}
</script>
