module.exports = {
  presets: [
    "@babel/preset-env",
    ['@babel/preset-react', { useBuiltIns: true }],
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    [
      '@babel/plugin-transform-runtime',
      // {
      //   corejs: false,
      //   helpers: true,
      //   regenerator: false,
      //   useESModules: false,
      // },
    ],
    "react-hot-loader/babel"
  ]
  // "plugins": [
  //   [
  //     "import",
  //     { "libraryName": "antd", "style": true }
  //   ] 
  // ]
}

