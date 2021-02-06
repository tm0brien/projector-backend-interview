module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                exclude: ['transform-async-to-generator', 'transform-regenerator'],
                modules: false
            }
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import'
    ],
    env: {
        jest: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        exclude: ['transform-async-to-generator', 'transform-regenerator']
                    }
                ],
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import'
            ]
        }
    }
}
