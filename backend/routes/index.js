var express = require('express');
var router = express.Router();
const Habit = require('../modelo/habit');
const habit = require('../modelo/habit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/habit',async function(req, res, next) {
  try{
  const {title, description} =  req.body;
  const habit = new Habit({title, description});
  await habit.save();
  res.json(habit);
  }catch(err){
    res.status(400).json({message: 'Error creating habit'});
  }
});

router.delete('/habit/:id', async (req, res, next)=>{
  try{
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'habit deleted'})
  }catch(err){
    res.status(500).json({message: 'Habit not found'});
  }
});

router.put('/habit/:id', async (req, res, next)=>{
  try{
    const{title, description} = req.body;
    const updateHabit = await Habit.findByIdAndUpdate(req.params.id,
      {title, description},
      {new: true, runValidators: true}
    );
    if (!updateHabit){
      return res.status(600).json({ message: 'Habit not found'});
    }
    res.json(updateHabit);
  }catch(err){
    res.status(700).json({message: 'Error updating habit'});
  }
});

module.exports = router;
