const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: path.resolve(__dirname, '../'),
    });
    // add scss support
    config.module.rules.push({
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));

    return config;
  },
};
