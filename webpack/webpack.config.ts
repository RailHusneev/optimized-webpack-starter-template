import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { isAnalyze, isDevMode } from "./lib/utils";
import baseConfig from "./base.config";
import devConfig from "./dev.config";
import prodConfig from "./prod.config";
import analyzeConfig from "./analyze.config";

const config = isDevMode
  ? merge<Configuration>(baseConfig, devConfig, isAnalyze ? analyzeConfig : {})
  : merge<Configuration>(baseConfig, prodConfig);

export default config;
