module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'aquaqapp',
        user: process.env.DB_USER || 'aquaqapp',
        password: process.env.DB_PASS || 'aquaqapp',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './aquaqapp.sqlite'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
    }
};