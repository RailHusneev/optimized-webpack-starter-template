import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const analyzeConfig: webpack.Configuration = {
  plugins: [new BundleAnalyzerPlugin()],
};

export default analyzeConfig;
