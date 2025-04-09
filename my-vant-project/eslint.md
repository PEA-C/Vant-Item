//配置eslint 2.4.2
    //关闭vscode自带代码修复，避免与ESlint冲突
    "editor.formatOnSave": false,
    // 启用ESlint作为格式化工具
    "eslint.format.enable": true,
    "eslint.run": "onType",
    //配置 ESLint 检查的文件类型
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "html",
        "vue"
    ],
    "eslint.options": {
        "extensions": [
            ".js",
            ".vue",
            ".jsx",
            ".tsx"
        ]
    },
    //重要，让eslint显示在右下角，点击可观察插件运行是否有问题
    "eslint.alwaysShowStatus": true,
    //代码保存时，自动执行ESlint格式化代码
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit"
    },
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    }
    // 当保存的时候，eslint自动帮我们修复错误