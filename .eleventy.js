module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["njk", "svg", "jpg"]);
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
