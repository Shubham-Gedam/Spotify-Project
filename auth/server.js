import app from './src/app.js';
import connectDB from './src/db/db.js';
import {connect} from './src/broker/rabbit.js';


// Connect to the database
connectDB();

// Connect to RabbitMQ
connect();



app.listen(3000, () => {
  console.log('Auth server is running on http://localhost:3000');
});


