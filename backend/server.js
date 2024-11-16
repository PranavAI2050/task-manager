const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3006',
  optionsSuccessStatus: 200
}));

app.use(express.json());

app.use('/users', userRoutes);  
app.use('/tasks', auth, taskRoutes); 
app.get('/', (req, res) => {
  res.send('Task manager');
});
 
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
