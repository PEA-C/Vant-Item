<template>
<div class="collect-page">
    <van-nav-bar fixed title="我的收藏" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem v-for="(item, i) in list" :key="i" :item="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticlesCollect } from '@/api/article'
export default {
  name: 'collect-page',
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
      // 异步更新数据
      const res = await getArticlesCollect({
        page: this.page
      })
      this.list.push(...res.data.rows)
      this.loading = false
      this.page++
      console.log(this.page)

      if (this.page > res.data.pageTotal) {
        this.finished = true
      }
    }
  }
}

</script>

<style lang="less" scoped>
.collect-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
