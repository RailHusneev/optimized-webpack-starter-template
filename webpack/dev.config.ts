import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import { PATHS } from "./lib/utils";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const devConfig: webpack.Configuration & webpackDevServer.Configuration = {
  devServer: {
    static: PATHS.PUBLIC,
    hot: true,
    port: 3000,
    open: true,
  },
  plugins: [new ReactRefreshPlugin()],
};

export default devConfig;
