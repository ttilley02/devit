require('dotenv').config()


module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    // "connectionString": (process.env.NODE_ENV === 'test')
    //  ? process.env.TEST_DB_URL
    //  : process.env.DB_URL,
    DB_URL:process.env.DB_URL
    
    

    }

console.log(process.env.DB_URL)