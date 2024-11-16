const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
