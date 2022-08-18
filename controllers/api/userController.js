const router = require('express').Router();
const { User } = require('../../models');
// const bcrypt = require("bcrypt");
// const { beforeDestroy } = require('../../models/Dog');
// const { route } = require('.');
// const { default: ModelManager } = require('sequelize/types/model-manager');
// const { Model } = require('sequelize/types');
// const io = require("../../server");

// CREATE new user
// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body.username, 'REQ USERNAME')
//         const userData = await User.create({ //newUser?
//             // email: req.body.email,
//             username: req.body.username,
//             password: req.body.password,
//         });

//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             // req.session.username = userData.username;
//             req.session.loggedIn = true;

//             res.status(200).json(userData) //newUser
//         });
//     } catch (err) {
//         console.log(err)
//         res.status(400).json(err)
//     }
// });

//CREATE new user
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        }); 

        req.session.save(() => {
            req.session.user_id = userData.id; 
            req.session.loggedIn = true; 
            res.status(200).json(userData)
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


// ================LOGIN================//

//post login
router.post('/login', async (req, res) => {
    try {
        //username 
        const userData = await User.findOne({ where: { username: req.body.username } });
        
        if(!userData) {
            res.status(400).json({ message: 'incorrect username or password'})
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'invalid username or password'});
            return;
        }
        console.log('!!!!!!!!!!')
        console.log(userData)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true; 
            console.log(req.session)
            res.json({ user: userData, message: 'You are now logged in'});
            
        });

    } catch (err) {
        res.status(400).json(err);
    }  
});


//=============LOGOUT===========//

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});


module.exports = router;




