module.exports = ({enabled = true, ...webpackOptions} = {}) => (nextConfig = {}) => {

  return Object.assign({}, nextConfig, {
      webpack(config, options) {
          if (enabled) {
              const WebpackBar = require('webpackbar')
              const {isServer} = options

              const defaultProgressBar = {
                  name: isServer ? 'server' : 'client',
                  color: isServer ? 'orange' : 'green'
              }

              const webpackBar = Object.assign({}, defaultProgressBar, webpackOptions)
              config.plugins.push(new WebpackBar(webpackBar))
          }

          if (typeof nextConfig.webpack === 'function') {
              return nextConfig.webpack(config, options)
          }

          return config
      },
  })
}