module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["njk", "svg", "jpg", "png"]);
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
