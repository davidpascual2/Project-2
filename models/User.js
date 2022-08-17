// for Login
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt"); //only user model has this for password encryption
const sequelize = require("../config/connection");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }, 
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true,
        //     }
        // },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            }
        },
    },{
        hooks: {
            beforeCreate(userData) {
                userData.username = userData.username.toLowerCase();
                userData.password = bcrypt.hashSync(userData.password, 10);
                return userData;
            },
            beforeUpdate(updatedUser) {
                updatedUser.username = updatedUser.username.toLowerCase();
                updatedUser.password = bcrypt.hashSync(updatedUser.password, 10);
                return updatedUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;