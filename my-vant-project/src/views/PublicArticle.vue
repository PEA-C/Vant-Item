<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        @click="changeSorter('weight_desc')"
        :class="{ active: sorter === 'weight_desc' }"
        href="javascript:;"
        >推荐</a
      >
      <a
        @click="changeSorter(null)"
        :class="{ active: sorter === null }"
        href="javascript:;"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticles } from '@/api/article'
export default {
  components: { ArticleItem },
  name: 'artcle-page',
  data () {
    return {
      list: [],
      current: 1,
      sorter: 'weight_desc',
      loading: false, // 是否在加载中
      finished: false // 是否加载完了全部的数据
    }
  },
  async created () {
    // const res = await getArticles({
    //   current: 1,
    //   sorter: 'weight_desc'
    // })
    // this.list = res.data.rows
  },
  methods: {
    async onLoad () {
      const res = await getArticles({
        current: this.current,
        sorter: this.sorter
      })

      // 需要在 this.list 基础上，累加 res.data.rows
      this.list.push(...res.data.rows)
      // 如果数据已经请求完毕，需要将loading改成false，才能加载下一页的数据
      // 一旦 loading 改为 false，load事件可以再次触发
      this.loading = false
      this.current++

      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    },
    changeSorter (values) {
      this.sorter = values

      // 重置所有条件
      this.current = 1 // 排序条件变化，重新从第一页开始加载
      this.list = []
      this.finished = false // finished重置，重新有数据可以加载了
      // this.loading = false

      // 手动调用了加载更多，也需要手动将loading改成true，表示正在加载中（避免重复触发）
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
