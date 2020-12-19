<template>
  <div>
    <h1>{{briefDat.title}}</h1>
    <p>{{briefDat.authors}}</p>
    <p class="articletext">{{maintext}}</p>
    <div v-for="img in imglist" :key="img">
      <img :src="img"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aid: undefined,
      maintext: undefined,
      briefDat: {title: undefined},
      imglist: undefined
    }
  },
  mounted() {
    this.aid = this.$route.query.aid;
    this.fetchArticleData(this.aid);
  },
  methods: {
    async fetchArticleData(aid) {
      this.getTextData(aid);
      const req = {aid: aid};
      this.briefDat = await fetch('/api/article', {method: 'POST', body: JSON.stringify(req), headers: {
        'content-type': 'application/json'
      }}).then(resp => resp.json());
      console.log('briefDat:', this.briefDat);
      this.imglist = this.briefDat['image'].slice(0, -1).split(',').map((v, i, arr) => { return '/api/image/' + v; });
      console.log(this.imglist)
    },
    async getTextData(aid) {
      this.maintext = await fetch('/api/text/'+aid, {method: 'GET'}).then(resp => resp.text());
    }
  }
};
</script>

<style scoped>
.articletext {
  word-break: break-all;
}
</style>