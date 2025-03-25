var express = require('express');
var router = express.Router();
const Habit = require('../modelo/habit');
const habit = require('../modelo/habit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habit', async function(req, res, next) {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving habits' });
  }
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

router.patch('/habit/markasdone/:id', async (req,res)=> {
  try{
    const habit = await Habit.findById(req.params.id);
    habit.lastDone = new Date();
    if (timeDifferenceInHours(habit.lastDone, habit.lastUpdated) < 24){
      habit.lastUpdated = new Date();
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedAt);
      habit.save();
      res.status(200).json({message: 'Habit marked as done'});
    }else{
      habit.days = 1;
      habit.lastUpdated = new Date();
      habit.startedAt = new Date();
      habit.save();
      res.status(200).json({message: 'Habit restarted'});

    }
  }catch(err){
    res.status(500).json({message: 'Error updating Habit'});
  }
});

const timeDifferenceInHours = (date1, date2) => {
  const diffnceMS = Math.abs(date1 - date2);
  return diffnceMS / (1000 * 60 * 60); 
}

const timeDifferenceInDays = (date1, date2) => {
  const diffnceMS = Math.abs(date1 - date2);
  return Math.floor(diffnceMS / (1000 * 60 * 60 * 24));
}

module.exports = router;
