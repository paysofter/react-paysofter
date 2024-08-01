const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for your application
  output: {
    filename: "bundle.js", // Output filename for your bundled code
    path: path.resolve(__dirname, "dist"), // Output directory
    library: "ReactPaysofter", // Name of the global variable for the library
    libraryTarget: "umd", // Universal module definition for compatibility
    globalObject: "this", // For compatibility with various environments
  },
  mode: "production", // Change to 'production' for production builds
  devtool: "source-map", // Enable source maps for debugging
  resolve: {
    extensions: [".js", ".jsx"], // File extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Apply Babel loader for JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // Apply CSS loader
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Apply file loader for images
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: "src",
            },
          },
        ],
      },
    ],
  },
};
