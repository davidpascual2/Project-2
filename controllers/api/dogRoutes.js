const router = require('express').Router();
const { Dog } = require('../../models'); 
const withAuth = require('../../utils/auth')

//===========ADD DOG =================//

router.post('/', withAuth, async (req,res) => {
  try {
    console.log(req)
    const newDog = await Dog.create({
      ...req.body, // what does elipses do 
      user_id: req.session.user_id,
    });
    console.log(newDog)

      res.status(200).json(newDog);
  } catch (err) {
    console.log(err)
      res.status(400).json(err);
  }
});

//=======================UPDATE DOG=========================//

router.put('/:id', withAuth, async (req, res) => {
  try{
      const updateDog = await Dog.update({
          ...req.body //??
      },
      {
          where: { //??
              id: req.params.id //??
          }
      });

      if(!updateDog) {
          res.status(404).json({ message: 'no post with this ID'})
      }
      res.status(200).json(updateDog)
  } catch (err) {
    console.log(err)
      res.status(500).json(err)
  }
});

//======================Delete Dog============================//

router.delete('/:id', withAuth, async (req,res) => {
  try{
      const deleteDog = await Dog.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id
          }
      });

      if(!deleteDog) {
          res.status(404).json({ message: 'no post with that ID.'})
      }
      res.status(200).json(deleteDog)
  } catch (err) {
    console.log(err)
      res.status(500).json(err) //why 500 and not 400 like above
  }
});

module.exports = router;
