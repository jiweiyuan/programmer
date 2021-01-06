module.exports = {
    mode: "none",
    entry: './src/main.css',
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ // 从后往前执行
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
