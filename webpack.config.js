const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "index.js", // Output filename
    libraryTarget: "umd", // Output module type for broad compatibility
    globalObject: "this", // Necessary for UMD builds to work in Node.js environments
  },
  optimization: {
    minimize: false, // Disable minification
  },
  devtool: 'source-map', // Add this line for source maps
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
        test: /\.(png|jpe?g|gif|svg)$/, // Handle image imports
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images/", // Output directory for images
              publicPath: "images/", // Public path for images
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Automatically resolve file extensions
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
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
