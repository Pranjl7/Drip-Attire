# Drip Attire

A modern streetwear eCommerce web application featuring trendy apparel, bold designs, and effortless style — built for the new generation of fashion. This full-stack application provides a seamless shopping experience with user authentication, cart management, and an admin panel for product management.

## Features

- **User Authentication**: Secure signup/signin with JWT-based authentication
- **Shopping Cart**: Add, remove, and manage cart items with quantity controls
- **Product Collection**: Browse and explore the complete product catalog
- **Admin Panel**: Create, manage, and delete products
- **User Profiles**: Manage user account information and profile images
- **Responsive Design**: Modern UI built with Tailwind CSS, optimized for all devices
- **File Upload**: Image upload support for products and user profiles using Multer

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Zod** - Schema validation

### Frontend
- **EJS** - Server-side templating engine
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Client-side interactivity

### Development Tools
- **Nodemon** - Auto-restart during development
- **Morgan** - HTTP request logger
- **Concurrently** - Run multiple scripts simultaneously

## Project Structure

```
drip-attire/
├── src/
│   ├── controllers/      # Business logic handlers
│   │   ├── adminController.js
│   │   └── userController.js
│   ├── middlewares/      # Authentication & file upload
│   │   ├── adminAuth.js
│   │   ├── userAuth.js
│   │   └── multerLogic.js
│   ├── models/           # MongoDB schemas
│   │   ├── adminModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/           # Route definitions
│   │   ├── adminRoutes.js
│   │   ├── ejsRoutes.js
│   │   └── userRoutes.js
│   ├── styles/           # Tailwind CSS source
│   │   └── input.css
│   ├── utils/            # Utility functions
│   │   └── zodValidation.js
│   ├── .config/          # Configuration files
│   │   └── mongodb.config.js
│   └── server.js         # Application entry point
├── public/               # Static assets
│   ├── assets/           # Images, icons, uploads
│   ├── javascripts/      # Client-side scripts
│   ├── stylesheets/      # Compiled CSS
│   └── favicon.ico
├── views/                # EJS templates
│   ├── partials/         # Reusable components
│   └── *.ejs             # Page templates
├── tailwind.config.js    # Tailwind configuration
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drip-attire
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   USER_JWT_SECRET=your_user_jwt_secret_key
   ADMIN_JWT_SECRET=your_admin_jwt_secret_key
   SESSION_SECRET=your_session_secret_key
   ```

4. **Build Tailwind CSS**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run conc
   ```

6. **Access the application**
   - Open `http://localhost:3000` in your browser

## API Endpoints

### User Routes (`/api/user`)
- `POST /signup` - User registration
- `POST /signin` - User login
- `GET /account` - Get user account (protected)
- `GET /cart` - Get user cart (protected)
- `POST /cart/add` - Add item to cart (protected)
- `DELETE /cart/delete` - Remove item from cart (protected)
- `DELETE /cart/decreement` - Decrease item quantity (protected)
- `DELETE /cart/clear` - Clear entire cart (protected)
- `DELETE /logout` - User logout (protected)

### Admin Routes (`/api/admin`)
- `POST /signup` - Admin registration
- `POST /signin` - Admin login
- `GET /account` - Get admin account (protected)
- `POST /create` - Create new product (protected)
- `DELETE /delete` - Delete product (protected)
- `DELETE /clear` - Clear all products (protected)
- `DELETE /logout` - Admin logout (protected)

### Page Routes (`/`)
- `GET /` - Homepage
- `GET /collection` - Product collection page
- `GET /cart` - Shopping cart page
- `GET /checkout` - Checkout page
- `GET /user/signup` - User registration form
- `GET /user/signin` - User login form
- `GET /user/account` - User account page
- `GET /admin/signin` - Admin login form
- `GET /admin/account` - Admin dashboard (protected)
- `GET /admin/create` - Create product page (protected)
- `GET /refundpolicy` - Refund policy page
- `GET /terms-and-conditions` - Terms & conditions page

## Authentication Flow

1. User/Admin signs up or signs in
2. Server validates credentials and hashes passwords using bcrypt
3. JWT token is generated and stored in HTTP-only cookie
4. Protected routes verify token via middleware
5. Token expiration/logout clears the cookie

## Deployment

### Railway Deployment

The application is configured for Railway deployment:

1. **Build Process**: Automatically runs `npm run build` to compile Tailwind CSS
2. **Start Command**: `npm start` (builds CSS and starts server)
3. **Environment Variables**: Set all required env vars in Railway dashboard
4. **MongoDB**: Use MongoDB Atlas or Railway's MongoDB service

## Contributing
  Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## License
Distributed under the MIT License.