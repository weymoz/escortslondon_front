const PROXIED_HOST = "http://localhost:8080";

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.(png)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: false,
          },
        },
      ],
    });

    /*
    config.node = {
      fs: "empty",
    };
    */

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/blog/:slug*",
        destination: "http://env-9409993.j.layershift.co.uk/blog/:slug*",
      },
      {
        source: "/bundle.js",
        destination: `${PROXIED_HOST}/bundle.js`,
      },
      {
        source: "/bundle.css",
        destination: `${PROXIED_HOST}/bundle.css`,
      },
    ];
  },
};
