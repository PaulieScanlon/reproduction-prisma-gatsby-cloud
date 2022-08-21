exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [{ test: /\.(prisma)$/i, type: 'asset/resource' }]
    }
  });
};
