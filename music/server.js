import app from './src/app.js';
import connectDB from './src/db/db.js';

// Connect to the database
connectDB();


app.listen(3000, () => {
  console.log('Music app is running on http://localhost:3000');
});