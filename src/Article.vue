<template>
  <div>
    <h1>{{briefDat.title}}</h1>
    <p>{{briefDat.authors}}</p>
    <el-row style="margin: 20px">
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
    <el-row v-if="videosrc">
      <a :href="videosrc">视频下载链接</a>
    </el-row>
    <video id="videoElement"></video>
    <el-row style="width: 1000px; margin: auto">
      <el-carousel type="card" :interval="4000" height="300px">
        <el-carousel-item v-for="img in imglist" :key="img">
          <!-- <h3 class="medium">{{ img }}</h3> -->
          <el-card :body-style="{ padding: '0px' }">
            <el-image 
              :src="img"
              :fit="cover" 
              class="medium image"></el-image>
            <div class="clearfix"> <span> {{img}} </span> </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <el-row style="width: 1000px; margin: auto">
      <p class="articletext">{{maintext}}</p>
    </el-row>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  data() {
    return {
      aid: undefined,
      maintext: undefined,
      briefDat: {title: undefined},
      imglist: undefined,
      videosrc: "",
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
  watch: {
    '$route' (oldval, newval) {
      this.aid = this.$route.params.aid;
      this.fetchArticleData(this.aid);
    }
    // videosrc: function(oldval, newval) {
    //   if (!newval) {
    //     console.log('videosrc is empty str');
    //     return;
    //   }
    //   if (flvjs.isSupported()) {
    //     var videoElement = document.getElementById('videoElement');
    //     var flvPlayer = flvjs.createPlayer({
    //         type: 'flv',
    //         url: '/api/video/video_a30_video.flv'
    //     });
    //     flvPlayer.attachMediaElement(videoElement);
    //     flvPlayer.load();
    //     flvPlayer.play();
    //   }
    // }
  },
  mounted() {
    this.aid = this.$route.params.aid;
    this.fetchArticleData(this.aid);
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: '/api/video/video_a30_video.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
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
      console.log(this.imglist);
      this.videosrc = this.briefDat['video'] ? ('/api/video/' + this.briefDat['video']) : '';
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
  height: 260px;
  display: block;
  margin: auto;
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