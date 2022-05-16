import { fileURLToPath } from 'url';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development", // "production" | "development" | "none"
  // default entry "./src"
  entry: {
    main: "./src/index.jsx",
  },
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // target directory for all output files
    filename: "[name].bundle.js", // filename template
    publicPath: "/assets/", // url as href to html files
  },
  module: {
    // configuration regarding modules
    // rules for modules (configure loaders, parser options, etc)
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [],
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/preset-react"]
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
        include: [
          path.resolve(__dirname, "src")
        ],
      }
    ],
  },
  context: __dirname,
  target: "web",
  stats: "errors-only",
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "public"),
        publicPath: "/",
        serveIndex: true,
      },
    ],
    compress: true,
    port: 3000,
    hot: false,
    open: false,
  },
  optimization: {
    minimize: true,
  },
  plugins: [new MiniCssExtractPlugin()],
}
