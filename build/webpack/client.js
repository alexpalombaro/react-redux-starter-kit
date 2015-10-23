import webpack from 'webpack';
import config  from '../../config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ModernizrPlugin from 'modernizr-webpack-plugin';

const paths = config.get('utils_paths'),
  globals = config.get('globals');

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: {
    app: [
      paths.src('entry-points/client')
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: paths.dist('client'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign(config.get('globals'), {
      __CLIENT__: true
    })),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: paths.src('index.html'),
      hash: true,
      filename: 'index.html',
      minify: globals.__PROD__,
      inject: 'body'
    }),
    new ModernizrPlugin(config.get('modernizr'))
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: config.get('utils_aliases')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: paths.project(config.get('dir_src')),
        loader: 'babel',
        query: ((query) => {
          if (globals.__DEV__) {
            query = Object.assign({}, query, {
              'plugins': [
                'react-transform'
              ],
              'extra': {
                'react-transform': {
                  'transforms': [{
                    'transform': 'react-transform-hmr',
                    'imports': ['react'],
                    'locals': ['module']
                  }]
                }
              }
            })
          }
          return query;
        })({optional: ['runtime']})
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer?browsers=last 2 version',
          'sass-loader?includePaths[]=' + paths.src('styles')
        ]
      },
      {
        test: /\.eot$|\.svg$|\.ttf$|\.woff2?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  eslint: {
    configFile: paths.project('.eslintrc'),
    failOnError: globals.__PROD__,
    emitWarning: globals.__DEV__
  }
};

// ----------------------------------
// Vendor Bundle Configuration
// ----------------------------------
webpackConfig.entry.vendor = config.get('vendor_dependencies');

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].[hash].js'
);
commonChunkPlugin.__KARMA_IGNORE__ = true;
webpackConfig.plugins.push(commonChunkPlugin);

// ----------------------------------
// Environment-Specific Defaults
// ----------------------------------
if (globals.__DEV__) {
  webpackConfig.entry.app.push(
    `webpack-dev-server/client?${config.get('webpack_public_path')}`,
    `webpack/hot/dev-server`
  );

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

if (globals.__DEBUG_JS__) {
  const postLoaders = webpackConfig.module.postLoaders || [];
  postLoaders.push({
    test: /\.js/,
    include: paths.project(config.get('dir_src')),
    loader: 'export-file'
  });
  webpackConfig.module.postLoaders = postLoaders;
}

if (globals.__PROD__) {

  // Compile CSS to its own file in production.
  webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
    if (/css/.test(loader.test)) {
      const [first, ...rest] = loader.loaders;

      loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
      delete loader.loaders;
    }

    return loader;
  });

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        'comments': false
      },
      compress: {
        'unused': true,
        'dead_code': true
      }
    })
  );
}

// ------------------------------------
// Optional Configuration
// ------------------------------------
if (
  !globals.__DEV__ ||
  (globals.__DEV__ && config.get('webpack_lint_in_dev'))
) {
  webpackConfig.module.preLoaders = [
    {
      test: /\.(js|jsx)$/,
      loaders: ['eslint-loader'],
      include: paths.project(config.get('dir_src'))
    }
  ];
}

export default webpackConfig;
