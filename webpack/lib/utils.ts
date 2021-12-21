import path from "path";

export const PATHS = {
    SRC: path.join(__dirname, "../../src"),
    ENTRY: path.join(__dirname, "../../src/index.tsx"),
    OUTPUT: path.join(__dirname, "../../bundle"),
    PUBLIC: path.join(__dirname, "../../src/public"),
    HTML_TEMPLATE: path.join(__dirname, "../../src/public/index.html"),
};

export const isAnalyze = Boolean(process.env.ENABLE_ANALYZE);
export const isDevMode = (process.env.NODE_ENV ?? 'production') === "development";
export const webpackMode = isDevMode ? "development" : "production";