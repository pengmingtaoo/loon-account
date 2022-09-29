
const path = require('path');//引入node.js的path模块
//按照vue cli 文档翻译 ，项目没有的webpack.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/loon-account-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config =>{//是一个函数，接收一个config,返回。。。
    //icon所在的目录
    const dir = path.resolve(__dirname,'src/assets/icons');
    //vue封装webpack的api然后暴露出congfig

    config.module
      .rule('svg-sprite')//添加一个规则
      .test(/\.svg$/)//匹配上这个正则，就用这个规则
      //只包含这个 icons 目录才会走这个规则
      .include.add(dir).end()
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract:false}).end()//extract:false不需要解析出文件

      .use('svgo-loader').loader('svgo-loader')//svg优化的loader
      //removeAttrs删除属性
      .tap(options=>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()//解决svg自带颜色

    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'),[{plainSprite:true}])//配置插件
    config.module.rule('svg').exclude.add(dir)//其他 svg loader 排除 icons 目录
  }
}
