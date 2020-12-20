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
  mounted() {
    this.getTableData();
  },
  components: {
    Articlelist
  },
  methods: {
    async getTableData() {
      const aidlist = (await fetch('/api/top5', {method: 'POST', body: JSON.stringify({period:'daily'}), headers: {
        'content-type': 'application/json'
      }}).then(res => res.json()))['articleAidList'];
      const fetchlist = aidlist.map((aid,idx,arr) => {
        return fetch('/api/article', {method: 'POST', body: JSON.stringify({aid: aid}), headers:{
          'content-type': 'application/json'
        }}).then(res => res.json());
      });
      this.tableData = await Promise.all(fetchlist);
      console.log(this.tableData);
    }
  }
};
</script>