const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

//https://webpack.js.org/plugins/html-webpack-plugin/
const htmlPlugin = new HtmlWebPackPlugin({
  template: "public/index.html",
  // favicon: "public/favicon.ico",
  // filename: "index.html",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    useShortDoctype: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const plugins = [htmlPlugin];

  return {
    entry: ["./config/polyfills.js", "./src/index.tsx"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[hash:8].js",
      publicPath: "/",
    },
    devtool: isProduction ? false : "eval-source-map",
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: ["babel-loader?cacheDirectory"], //order matters
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          loader: "url-loader",
          options: { limit: 4096, name: "[name].[hash:8].[ext]" },
        },
      ],
    },
    devServer: {
      // host: "0.0.0.0", //makes server accessible over local network
      port: 3000,
      compress: true,
      overlay: true,
      historyApiFallback: true, //redirect 404 to index.html
      stats: "minimal",
    },
    stats: { children: false, modules: false, moduleTrace: false },
    performance: { hints: false },
    plugins,
  };
};
