const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.Node_ENV === 'production'

module.exports = {
    // Modo production, faz otimizações
    mode: isDevelopment ? 'development' : 'production',
    // Permite visalizar codigos origial dentro de um BUNDLE(melhor para debug)
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    // Arquivo principal da aplicação
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    // Passar arquivo de saida, onde WebPach, babel criaram os Bundle
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // Habilita quais arquivos serão utilizados na aplicação
    resolve: {
        extensions: ['.js', '.jsx', '.tsx']
    },
    // Aponta para pasta publica, onde estão a Dist
    // Monitora as alterações nos arquivos, cria bundle automaticamente
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true
    },
    plugins: [
        isDevelopment && ReactRefreshWebpackPlugin(),
        // incluido automaticamente arquivo bundle no Layoyt
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/, // Regex $ termina
                exclude: /nome_modules/, // Remove arquivos de bibliotecas
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                } // Integração Babel com WebPack
            },
            {
                test: /\.scss$/, // Regex $ termina
                exclude: /nome_modules/, // Remove arquivos de bibliotecas
                use: ['style-loader', 'css-loader', 'sass-loader'] // Integração SCSS
            }
        ]
    }
}