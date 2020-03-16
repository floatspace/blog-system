const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("pages", resolve("src/pages"))
      .set("comp", resolve("src/components"));
  },
  devServer: {
    proxy: "http://localhost:3000"
  }
};
