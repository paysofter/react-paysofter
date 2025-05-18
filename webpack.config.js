const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "index.js", // Output filename
    publicPath: "./dist/", // Public path
    libraryTarget: "umd", // Output module type for broad compatibility
    globalObject: "this", // Necessary for UMD builds to work in Node.js environments
  },
  optimization: {
    minimize: false, // Disable minification
  },
  devtool: "source-map", // Add this line for source maps
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JS and JSX files using Babel
        include: path.resolve(__dirname, "src"), // Include source files
        exclude: /node_modules/, // Exclude unnecessary folders
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Use env and react presets
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS imports
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Handle image imports

        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       name: "[name].[hash:8].[ext]",
        //       outputPath: "images/", // Output directory for images
        //       publicPath: "/dist/images", // Public path for images
        //     },
        //   },
        // ],

        use: [
          {
            loader: "url-loader",
            options: {
              limit: 20000,
              name: "[name].[ext]",
              // name: "[name].[hash:8].[ext]",
              outputPath: "images/",
              publicPath: "images/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Automatically resolve file extensions
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      images: path.resolve(__dirname, "dist/images/"),
    },
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
};
