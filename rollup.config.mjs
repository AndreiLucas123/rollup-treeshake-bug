//
//

export default {
  input: "./src/index.js",
  output: {
    dir: "./dist",
    format: "es",
    sourcemap: false,
    entryFileNames: `[name].js`,
    chunkFileNames: `[name].js`,
    assetFileNames: `[name].[ext]`,
  },
  watch: {
    clearScreen: false,
    include: "src/**",
  },
};
