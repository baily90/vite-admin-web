export default [
  {
    url: "/api/user/login",
    method: "post",
    response: () => {
      return {
          code: 200,
          message: "ok",
          data: {
            token: '@guid',
            name: '@cname'
          }
      }
    }
  },
  {
      url: "/api/user/info",
      method: "get",
      response: () => {
        return {
            code: 200,
            message: "ok",
            data: {
              roles: ['admin'],
            },
        }
      }
  }
]