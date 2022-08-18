//import models
const User = require("./User");
const Lobby = require("./Lobby");
// const { AggregateError } = require('sequelize/types');
const Dog = require('./Dog')


User.hasMany(Dog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Dog.belongsTo(User, {
    foreignkey: 'user_id'
});



module.exports = { User, Lobby, Dog };