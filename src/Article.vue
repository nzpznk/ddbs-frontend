<template>
  <div>
    <h1>{{briefDat.title}}</h1>
    <p>{{briefDat.authors}}</p>
    <el-row>
      <el-popover
        placement="bottom"
        title="读过的用户"
        trigger="hover"
        :content="readList">
        <el-tag
          slot="reference"
          effect="light">
          阅读量：{{ readNum }}
        </el-tag>
      </el-popover>
      <el-popover
        placement="bottom"
        title="评论用户"
        trigger="hover"
        :content="commentList">
        <el-tag
          slot="reference"
          effect="light">
          评论数：{{ commentNum }}
        </el-tag>
      </el-popover>
      <el-popover
        placement="bottom"
        title="点赞用户"
        trigger="hover"
        :content="agreeList">
        <el-tag
          slot="reference"
          effect="light">
          点赞数：{{ agreeNum }}
        </el-tag>
      </el-popover>
      <el-popover
        placement="bottom"
        title="分享用户"
        trigger="hover"
        :content="shareList">
        <el-tag
          slot="reference"
          effect="light">
          分享数：{{ shareNum }}
        </el-tag>
      </el-popover>
    </el-row>
    <p class="articletext">{{maintext}}</p>
    <el-row>
    <el-col style="padding: 10px" span="8" v-for="img in imglist" :key="img">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="img" class="image"/>
        <div class="clearfix">
          <span> {{img}} </span>
        </div>
      </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aid: undefined,
      maintext: undefined,
      briefDat: {title: undefined},
      imglist: undefined,
      readNum: 0,
      commentNum: 0,
      agreeNum: 0,
      shareNum: 0,
      readList: "",
      commentList: "",
      agreeList: "",
      shareList: ""
    }
  },
  mounted() {
    this.aid = this.$route.query.aid;
    this.fetchArticleData(this.aid);
  },
  methods: {
    async fetchArticleData(aid) {
      this.getTextData(aid);
      this.getStatsData(aid);
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
    },
    async getStatsData(aid) {
      const dat = await fetch('/api/beread', {method: 'POST', body: JSON.stringify({aid: aid}), headers: {
        'content-type': 'application/json'
      }}).then(resp => resp.json());
      this.readNum = dat['readNum'];
      this.commentNum = dat['commentNum'];
      this.shareNum = dat['shareNum'];
      this.agreeNum = dat['agreeNum'];
      this.readList = dat['readUidList'].toString();
      this.commentList = dat['commentUidList'].toString();
      this.agreeList = dat['agreeUidList'].toString();
      this.shareList = dat['shareUidList'].toString();
    }
  }
};
</script>

<style scoped>
.articletext {
  word-break: break-all;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>