/*全局 登录用户信息*/
let userInfo = null

try {
  userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
} catch (ex) {}
const userAllInfo={
  state: {
    userInfo: userInfo || {}
  },
  getters: {
    getUserInfo (state) { // 获取用户信息
      return state.userInfo
    }
  },
  mutations: {
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    setUserInfo (context, userInfo) {
      if (userInfo) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
      context.commit('updateUserInfo', userInfo)
    }
  }
}

export default userAllInfo
