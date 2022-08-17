const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Lobby extends Model { }

Lobby.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
},
{
    sequelize,
});

module.exports = Lobby;