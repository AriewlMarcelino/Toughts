const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User')

//User
const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allownull: false,
        require: true,
    },
})

Tought.belongsTo(User);
Tought.hasMany(Tought);



module.exports = Tought;