const express = require('express');
const plantRouter = require('./routes/plant-router.js');

const PORT = process.env.PORT || 8001;

const app = express();

// Body parser middleware
app.use(express.static('build'));
app.use(express.json());

/* Routes */
app.use('/api/plant', plantRouter);

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
