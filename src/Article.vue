<template>
  <div>
    <p>this is an article.</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getBriefArticleDat(1);
  },
  methods: {
    getBriefArticleDat(aid) {
      fetch('/api/text/'+aid, {method: 'GET'})
      .then(resp => resp.text())
      .then(res => {
        console.log(res);
      })
    }
  }
};
</script>