import request from '@/utils/request'
// import { getToken } from '@/utils/storage'

export const getArticles = (obj) => {
  console.log(obj)

  // const token = getToken()
  return request.get('/interview/query', {
    params: {
      current: obj.current,
      sorter: obj.sorter,
      pageSize: 10
    }
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
  })
}

export const getArticlesDetail = (id) => {
  return request.get('interview/show', {
    params: {
      id
    }
  })
}

export const updateLike = (id) => {
  return request.post('interview/opt', {
    id,
    optType: 1 // 喜欢
  })
}

export const updateCollect = (id) => {
  return request.post('interview/opt', {
    id,
    optType: 2 // 收藏
  })
}

export const getArticlesCollect = (obj) => {
  return request.get('/interview/opt/list', {
    params: {
      page: obj.page, // 当前页
      pageSize: 5, // 可选
      optType: 2 // 表示收藏
    }
  })
}

export const getArticlesLike = (obj) => {
  return request.get('interview/opt/list', {
    params: {
      page: obj.page,
      pageSize: 5,
      optType: 1
    }
  })
}
