const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const ejsRoutes = require('./routes/ejsRoutes');

// DB
const connectDB = require('./.config/mongodb.config');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/', ejsRoutes);

// Database connection function
const startServer = async () => {
  await connectDB();
  // Only start listening if NOT running as serverless (Vercel)
  if (!process.env.VERCEL) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
};

// Run the server if this file is executed directly
if (require.main === module) {
  startServer();
}

module.exports = app;