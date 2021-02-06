/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const babelConfig = require('./babel.config')

const nodeModules = {}
fs.readdirSync('./node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod
    })

module.exports = function (env) {
    const plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || 'development')
        }),
        new webpack.LoaderOptionsPlugin({ options: {} }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                configFile: path.resolve('./tsconfig.json'),
                mode: 'write-tsbuildinfo'
            },
            eslint: {
                options: {
                    configFile: path.resolve('./.eslintrc.js'),
                    ignorePath: path.resolve('./.eslintignore'),
                    quiet: true
                },
                enabled: true,
                files: './**/*.{ts,js}' // required - same as command `eslint ./**/*.{ts,js} --ext .ts,.js`,
            }
        })
    ]

    plugins.push(
        new HardSourceWebpackPlugin({
            // Either an absolute path or relative to webpack's options.context.
            cacheDirectory: process.cwd() + '/.cache/hard-source/[confighash]',
            // Either a string of object hash function given a webpack config.
            configHash: function (webpackConfig) {
                // node-object-hash on npm can be used to build this.
                return require('node-object-hash')({ sort: false }).hash(webpackConfig)
            },
            // Either false, a string, an object, or a project hashing function.
            environmentHash: {
                root: process.cwd(),
                directories: [],
                files: ['./package.json', './package-lock.json', './webpack.config.js', './tsconfig.json']
            },
            // An object.
            info: {
                // 'none' or 'test'.
                mode: 'none',
                // 'debug', 'log', 'info', 'warn', or 'error'.
                level: 'debug'
            },
            // Clean up large, old caches automatically.
            cachePrune: {
                // Caches younger than `maxAge` are not considered for deletion. They must
                // be at least this (default: 2 days) old in milliseconds.
                maxAge: 2 * 24 * 60 * 60 * 1000,
                // All caches together must be larger than `sizeThreshold` before any
                // caches will be deleted. Together they must be at least this
                // (default: 50 MB) big in bytes.
                sizeThreshold: 50 * 1024 * 1024
            }
        })
    )

    return {
        context: path.resolve('./src'),
        entry: {
            index: 'index.ts'
        },
        target: 'node',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: babelConfig
                    }
                },
                {
                    type: 'javascript/auto',
                    test: /\.mjs$/
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        onlyCompileBundledFiles: true,
                        reportFiles: ['**/*.{ts}'],
                        experimentalFileCaching: true,
                        configFile: 'tsconfig.json'
                    },
                    exclude: /(node_modules)/
                }
            ]
        },
        plugins,
        devtool: 'inline-source-map',
        output: {
            filename: '[name].js',
            path: path.resolve('./bundles')
        },
        resolve: {
            modules: [path.resolve('./node_modules'), path.resolve('./src')],
            extensions: ['.ts', '.js']
        },
        externals: nodeModules,
        stats: {
            warningsFilter: /export .* was not found in/
        }
    }
}
