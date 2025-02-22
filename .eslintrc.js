module.exports = {
    // 继承 Eslint 规则
    extends: ["eslint:recommended"],
    env: {
        es6: true,
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 15,
        sourceType: "module",
    },
    rules: {
        "no-dupe-args": 2, // 函数参数不能重复
        "no-duplicate-case": 2, // switch中的case标签不能重复
        "no-else-return": 2, // 如果if语句里面有return,后面不能跟else语句
        "no-empty": 2, // 块语句中的内容不能为空
        "no-var": 0, // 不能使用 var 定义变量
        "indent": [2, 4, { SwitchCase: 1 }], // 缩进风格
        "strict": 2,
        "use-isnan": 2,
        "no-redeclare": 0, // 禁止重复声明变量
        "no-trailing-spaces": 1, // 一行结束后面不要有空格
        "no-this-before-super": 2, // 在调用super()之前不能使用this或super
        "no-unneeded-ternary": 2, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
        "no-unreachable": 2, // 不能有无法执行的代码
        "no-use-before-define": 2, // 未定义前不能使用
        "new-cap": 2, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
        "new-parens": 2, // new时必须加小括号
        "eqeqeq": 0, // 必须使用全等
        "no-import-assign": 0
    },
};
