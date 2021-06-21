const Sequelize = require('sequelize');
const connection = require('./database');

const marker = connection.define('marker', {
    id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    userId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model: 'users',
            key: 'id',
            onDelete: 'cascade'
        }
    },
    tipo: {
        type:Sequelize.CHAR,
        allowNull:false
    },
    latitude: {
        type:Sequelize.FLOAT,
        allowNull:false
    },
    longitude: {
        type:Sequelize.FLOAT,
        allowNull:false
    }
});

module.exports = marker;