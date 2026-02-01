module.exports = {
    apps: [
        {
            name: 'nuxt-blog',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env: {
                NODE_ENV: 'production',
                // API_KEY: 'your-api-key-here' // 建议通过 .env 或环境变量设置
            },
            // 日志配置
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            error_file: './logs/error.log',
            out_file: './logs/access.log',
            merge_logs: true,
            // 自动重启配置
            autorestart: true,
            max_memory_restart: '500M'
        }
    ]
}
