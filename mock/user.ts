export default [
  {
    url: "/api/user/login",
    method: "post",
    response: () => {
        return {
            code: 200,
            message: "ok",
            data: {
              token: 'kjahgsdyfhg',
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
                name: '百里',
                
              },
          }
      }
  }
]