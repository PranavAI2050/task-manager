const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.userId });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const { status, sortBy , order} = req.query;
    const filter = { userId: req.user.userId };
    if (status) filter.status = status;
    const sortOrder = order === '1' ? 1 : order === '-1' ? -1 : 1;
    const tasks = await Task.find(filter).sort(sortBy ? { [sortBy]: sortOrder } : {});
    // console.log(tasks);
    res.send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.userId });

    if (!task) {
      return res.status(404).send('Task not found or you are not authorized to delete it.');
    }

    res.status(200).send({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },  
      updates,
      { new: true, runValidators: true }  
    );

    if (!task) {
      return res.status(404).send('Task not found or you are not authorized to update it.');
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { userId: req.user.userId }; 
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/sort', async (req, res) => {
  try {
    const { order } = req.query; 
    const sortOrder = order === 'desc' ? -1 : 1; 

    const tasks = await Task.find({ userId: req.user.userId }).sort({ dueDate: sortOrder });

    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
