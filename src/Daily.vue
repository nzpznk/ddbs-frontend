<template>
  <Articlelist
    :tableData="tableData"></Articlelist>
</template>

<script>
import Articlelist from "./Articlelist.vue";
export default {
  computed: {
    tableData() {
      return [{"date": "1506000000000", "aid": "0", "title": "title0", "category": "science", "abstract": "abstract of article 0", "articleTags": "tags31", "authors": "author396", "language": "zh", "text": "text_a0.txt", "image": "image_a0_0.jpg,image_a0_1.jpg,image_a0_2.jpg,image_a0_3.jpg,", "video": ""}
              ,{"date": "1506000000001", "aid": "1", "title": "title1", "category": "science", "abstract": "abstract of article 1", "articleTags": "tags11", "authors": "author1264", "language": "zh", "text": "text_a1.txt", "image": "image_a1_0.jpg,image_a1_1.jpg,image_a1_2.jpg,image_a1_3.jpg,image_a1_4.jpg,", "video": ""}
              ,{"date": "1506000000002", "aid": "2", "title": "title2", "category": "science", "abstract": "abstract of article 2", "articleTags": "tags46", "authors": "author508", "language": "en", "text": "text_a2.txt", "image": "image_a2_0.jpg,image_a2_1.jpg,", "video": ""}
              ,{"date": "1506000000003", "aid": "3", "title": "title3", "category": "technology", "abstract": "abstract of article 3", "articleTags": "tags11", "authors": "author59", "language": "zh", "text": "text_a3.txt", "image": "image_a3_0.jpg,image_a3_1.jpg,image_a3_2.jpg,", "video": ""}
              ,{"date": "1506000000004", "aid": "4", "title": "title4", "category": "science", "abstract": "abstract of article 4", "articleTags": "tags43", "authors": "author404", "language": "en", "text": "text_a4.txt", "image": "image_a4_0.jpg,image_a4_1.jpg,image_a4_2.jpg,image_a4_3.jpg,", "video": ""}
              ,{"date": "1506000000005", "aid": "5", "title": "title5", "category": "science", "abstract": "abstract of article 5", "articleTags": "tags41", "authors": "author53", "language": "zh", "text": "text_a5.txt", "image": "image_a5_0.jpg,image_a5_1.jpg,image_a5_2.jpg,image_a5_3.jpg,", "video": ""}
              ,{"date": "1506000000006", "aid": "6", "title": "title6", "category": "technology", "abstract": "abstract of article 6", "articleTags": "tags43", "authors": "author1230", "language": "en", "text": "text_a6.txt", "image": "image_a6_0.jpg,image_a6_1.jpg,image_a6_2.jpg,image_a6_3.jpg,image_a6_4.jpg,", "video": ""}
              ,{"date": "1506000000007", "aid": "7", "title": "title7", "category": "science", "abstract": "abstract of article 7", "articleTags": "tags11", "authors": "author1603", "language": "zh", "text": "text_a7.txt", "image": "image_a7_0.jpg,", "video": ""}]
    }
  },
  components: {
    Articlelist
  },
  methods: {
    getTableData() {
    }
  }
};
</script>