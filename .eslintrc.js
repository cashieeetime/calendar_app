module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential'],
    rules: {
        'no-unused-vars': 'off',
        'vue/no-useless-template-attributes': 'off',
        'pluginOptions.apollo.lintGQL': 'off'
    },
}