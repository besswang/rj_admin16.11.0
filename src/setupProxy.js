const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api', {
      // http://47.111.93.109:8082/swagger-ui.html#/
      //target: 'http://47.111.93.109:8082',// 后台
      // target: 'http://47.111.93.109:8083', // 渠道
      target: 'https://goladhandadmht.imxiaomang.com.cn', // 点金手后台
      //target: 'https://tgjycbbzqutorlj.zhengxingmeirong.net.cn', // 点金手渠道
      //target: 'http://47.94.142.215:8081',
      // target: 'http://qqter.chenxianshen.org.cn/',
     //target: 'https://hefengqb.qidianshenghuo.com.cn', // 及享用后台
      //target: 'https://qqter.chenxianshen.org.cn', // 及享用渠道后台
      //target :'http://cs.huakodai.com', //小赢花花后台
      //target: 'http://h5.huakodai.com', // 小赢花渠道后台
      //target: 'https://mxjqingjie.imxiaomang.com.cn', // 梦想借后台
      //target: 'https://qqter.anwangfei.cn', // 梦想借渠道后台
      //target: 'https://pizzaqb.zhengxingmeirong.net.cn', // pizza后台
      //target: 'https://qutorpsqb.qichegongzhuang.cn', // pizza渠道
      //target: 'https://beffqbxqj.aventureconsulting.com.cn', //牛肉干后台
      //target: 'https://nrgquutorr.leadingpharm.com.cn', //牛肉干渠道后台
      //target: 'https://ygfightjkadm.tiandingwangluo.cn', // 加油站后台
      //target: 'https://ygwlqutotjyz.mulkit.com.cn', // 加油站渠道后台
      //target: 'https://bhfruitjkqb.borneshop.com.cn', //百花果后台
      //target: 'https://fruitlyqdter.jasitlock.com.cn', //百花果渠道后台
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  )
}
