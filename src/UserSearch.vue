<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{userdat.name}} 基本信息</span>
    </div>
    <table style="margin:auto">
      <tr v-for="(v, k) in userdat" :key="(v, k)" class="text item">
        <td class="userdatkeyval">{{k}}</td>
        <td class="userdatkeyval">{{v}}</td>
      </tr>
    </table>
  </el-card>
  <el-collapse id="readshow" v-model="activeNames" @change="handleChange">
    <el-collapse-item title="读过的文章" name="1">
      <Articlelist
        :tableData="readlist"></Articlelist>
    </el-collapse-item>
    <el-collapse-item title="评论过的文章" name="2">
      <Articlelist
        :tableData="commentlist"></Articlelist>
    </el-collapse-item>
    <el-collapse-item title="分享过的文章" name="3">
      <Articlelist
        :tableData="sharelist"></Articlelist>
    </el-collapse-item>
    <el-collapse-item title="赞过的文章" name="4">
      <Articlelist
        :tableData="agreelist"></Articlelist>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
import Articlelist from './Articlelist.vue'
export default {
  mounted() {
    this.uid = this.$route.params.uid;
    this.fetchUserData(this.uid);
    this.fetchUserArticleStats(this.uid);
  },
  watch: {
    '$route' (oldval, newval) {
      this.uid = this.$route.params.uid;
      this.fetchUserData(this.uid);
      this.fetchUserArticleStats(this.uid);
    }
  },
  methods: {
    async fetchUserData(uid) {
      const req = {uid: uid};
      this.userdat = await fetch('/api/user', {method: 'POST', body: JSON.stringify(req), headers: {
        'content-type': 'application/json'
      }}).then(resp => resp.json());
      delete this.userdat['timestamp'];
      delete this.userdat['uid'];
    },
    async fetchUserArticleStats(uid) {
      const req = {uid: uid};
      this.userread = await fetch('/api/readlist', {method: 'POST', body: JSON.stringify(req), headers: {
        'content-type': 'application/json'
      }}).then(resp => resp.json());
      // const listlist = [this.userread.readlist, this.userread.commentlist, this.userread.sharelist, this.userread.agreelist]
      (async () => {
        this.readlist = await this.fetchArticlelistFromId(this.userread.readlist);
      })();
      (async () => {
        this.commentlist = await this.fetchArticlelistFromId(this.userread.commentlist);
      })();
      (async () => {
        this.sharelist = await this.fetchArticlelistFromId(this.userread.sharelist);
      })();
      (async () => {
        this.agreelist = await this.fetchArticlelistFromId(this.userread.agreelist);
      })();
    },
    async fetchArticlelistFromId(alist) {
      const fetchlist = alist.map((aid,idx,arr) => {
        return fetch('/api/article', {method: 'POST', body: JSON.stringify({aid: aid}), headers:{
          'content-type': 'application/json'
        }})
        .then(res => res.json())
        .then(res => {
          res.timestamp = (new Date(Number(res.timestamp))).toString();
          return res;
        });
      });
      return await Promise.all(fetchlist);
    },
    handleChange(val) {
      console.log(val);
    }
  },
  data() {
    return {
      uid: '',
      userdat: {name: ''},
      userread: undefined,
      readlist: [],
      agreelist: [],
      sharelist: [],
      commentlist: [],
      activeNames: ['1']
    };
  },
  components: {
    Articlelist
  }
}
</script>

<style scoped>
.userdatkeyval {
  width: 50%;
}
.box-card {
  width: 20%;
  margin: auto;
  font-family: monospace;
}
#readshow {
  width: 1000px;
  margin: auto;
}
</style>