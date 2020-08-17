const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = {
  async redirects() {
    return [
      {
        source: "/manual/:lang",
        destination: "/manual/:lang/introduction",
        permanent: true,
      },
    ];
  },
  ...withPlugins([optimizedImages]),
};
