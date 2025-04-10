<template>
  <div class="like-page">
    <van-nav-bar fixed title="我的点赞" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem v-for="(item,i) in list" :key="i" :item="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticlesLike } from '@/api/article'
export default {
  name: 'like-page',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async onLoad () {
      const res = await getArticlesLike({
        page: this.page
      })
      this.list.push(...res.data.rows)
      this.loading = false,
      this.page++

      if (this.page > res.data.pageTotal) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.like-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
