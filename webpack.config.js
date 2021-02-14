const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

// определяет в каком реиме сборки находится проект
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        //splitChunks: {
        //    chunks: 'all'
        //}
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const babelOptions = preset => {
    const options = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset)
        options.presets.push(preset)
    
        return options
}

module.exports = {
    context: path.resolve(__dirname, 'src'),                             // контекст выполнения - ищет все файлы для работы в папке src (в путях остальныз src можно удалить)
    mode: 'development',                        // конфигурация сборки (разработка, продакт)

    // точка входа (основной скрипт)
    entry: {                                    
        main: ['@babel/polyfill', './App.js']
    },        

    // куда складывать
    output: {                                   
        // имя итогового файла, 
        // [name] - паттерн имени, который ссылается на ключ в entry
        // [hash] - паттерн имени, хэш, который основывается на контенте внутри скрипта
        filename: '[name].[contenthash].js',           
        path: path.resolve(__dirname, 'dist')    // __dirname - корневая директория, dist - путь относительно нее, куда будут складываться сгенерированные файлы
    },

    resolve: {
        extensions: ['.js', '.json'],           // список расширений, которые должен понимать webpack (импорты в js можно писать без расширений)
        alias: {
            '@models': path.resolve(__dirname, 'src/models') // сокращает запись путей при импорте (см. index.js)
        }
    },

    optimization: optimization(),               // если используется одна библиотека на несколько входных точек, то он ее вынесет в отдельный файл

    devServer: {                                // настройка сервера разработки
        port: 4200,
        hot: isDev,
        historyApiFallback: true
    },

    // плагины
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',             // путь до исходного html (берет его за основу и подключает к нему сгенерированные скрипты)
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),                 // очищает папку назначения
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/'),
                    to: path.resolve(__dirname, 'dist/assets/')
                }
            ]
        }),    
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],

    // лоадеры
    module: {
        rules: [
            {
                test: /\.css$/,                   // если webpack находит файлы с расширением css, то использует лоадер ниже (в блоке use)
                use: [MiniCssExtractPlugin.loader, 'css-loader'] 
            },
            {
                test: /\.s[ac]ss$/,                   // если webpack находит файлы с расширением sass, то использует лоадер ниже (в блоке use)
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
            },
            {
                test: /\.(png|jpg|svg|gif)$/,     // загрузка изображений
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,  // загрузка шрифтов
                use: ['file-loader']
            },
            {
                test: /\.js$/,                    // babel
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            },
        ]
    }
}