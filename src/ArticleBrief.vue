<template>
  <Articlelist
    :tableData="tableData"></Articlelist>
</template>

<script>
import Articlelist from "./Articlelist.vue";
export default {
  data() {
    return {
      tableData: []
    }
  },
  props: {
    granularity: String
  },
  watch: {
    granularity: function(oldval, newval) {
      this.getTableData();
    }
  },
  mounted() {
    this.getTableData();
  },
  components: {
    Articlelist
  },
  methods: {
    async getTableData() {
      const aidlist = (await fetch('/api/top5', {method: 'POST', body: JSON.stringify({period:this.granularity}), headers: {
        'content-type': 'application/json'
      }}).then(res => res.json()))['articleAidList'];
      const fetchlist = aidlist.map((aid,idx,arr) => {
        return fetch('/api/article', {method: 'POST', body: JSON.stringify({aid: aid}), headers:{
          'content-type': 'application/json'
        }})
        .then(res => res.json())
        .then(res => {
          res.timestamp = (new Date(Number(res.timestamp))).toString();
          return res;
        });
      });
      this.tableData = await Promise.all(fetchlist);
      console.log(this.tableData);
    }
  }
};
</script>