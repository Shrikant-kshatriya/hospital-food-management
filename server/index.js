require('dotenv').config();
const express = require('express');
const db = require('./db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser')

// import routers
const authRoutes = require('./routes/authRoutes.js');
const patientRoutes = require('./routes/patientRoutes.js');
const pantryRoutes = require('./routes/pantryRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const deliveryPersonnelRoutes = require('./routes/deliveryPersonnelRoutes.js');
const orderBoxRoutes = require('./routes/orderBoxRoutes.js');

// import middleware
const isManager = require('./middlewares/managerMiddleware.js');
const isPantry = require('./middlewares/pantryMiddleware.js');
const isDeliveryPersonnel = require('./middlewares/deliveryPersonnelMiddleware.js');

// Connect to the database
db();

const app = express();

// cors middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

// setting middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRoutes);
app.use('/patients', isManager, patientRoutes);
app.use('/pantry', pantryRoutes);
app.use('/orders', orderRoutes);
app.use('/deliveryPersonnel', deliveryPersonnelRoutes);
app.use('/orderBox', orderBoxRoutes);

app.listen(4000, () => {
    console.log('Server is running on port ', 4000);
})