const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");

//https://webpack.js.org/plugins/html-webpack-plugin/
const htmlPlugin = new HtmlWebPackPlugin({
  template: "public/index.html",
  favicon: "public/favicon.png",
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

const swPlugin = new SWPrecacheWebpackPlugin({
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: "service-worker.js",
  logger(message) {
    if (message.indexOf("Total precache size is") === 0) {
      return;
    }
    if (message.indexOf("Skipping static resource") === 0) {
      return;
    }
    console.log(message);
  },
  minify: true,
  navigateFallback: "/index.html",
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /_redirects$/],
});

const manifestPlugin = new WebpackPwaManifest({
  name: "Reddit client",
  short_name: "Reddit",
  description: "Simple reddit client.",
  background_color: "#ffffff",
  theme_color: "#000000",
  orientation: "any",
  icons: [
    {
      src: path.resolve("img/reddit.png"),
      sizes: [96, 120, 128, 256, 512],
    },
  ],
});

const copyPlugin = new CopyWebpackPlugin([{ from: "./public/_redirects" }]);

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const plugins = [htmlPlugin];
  if (isProduction) plugins.push(manifestPlugin, swPlugin, copyPlugin);

  return {
    entry: ["./config/polyfills.js", "./src/index.tsx"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[hash:8].js",
      publicPath: "/",
    },
    devtool: isProduction ? false : "eval-source-map",
    resolve: { extensions: [".wasm", ".mjs", ".ts", ".tsx", ".js", ".json"] },
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
