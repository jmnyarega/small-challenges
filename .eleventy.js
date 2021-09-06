module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["njk", "svg", "jpg", "png", "css"]);
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
