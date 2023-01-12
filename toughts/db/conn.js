const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Database is connected sucessfull...')
} catch (err) {
    console.log('Database in not connect..')
}

module.exports = sequelize;