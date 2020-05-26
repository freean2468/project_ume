// configs 변수
const configs = {
    database: process.env.DATABASE || 'localhost',
    port: process.env.PORT || 3100,
    username: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || 'admin',
    dialect: process.env.DIALECT || 'mysql',
    connectTimeout: Number(process.env.CONNECT_TIMEOUT || 1000)
}

export default configs;