module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["njk", "svg", "jpg", "png", "css", "js"]);
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
