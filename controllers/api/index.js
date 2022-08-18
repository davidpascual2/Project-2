const router = require('express').Router();
const userRoutes = require("./userController");
const lobbyRoutes = require("./lobbyController");
const dogRoutes = require('./dogRoutes');

router.use("/users", userRoutes); // users is used in public js files
router.use("/lobby", lobbyRoutes);
router.use('/dogs', dogRoutes);

module.exports = router;



