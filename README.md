# 🎬 Movix API – Backend for the Movie Discovery Application

Movix API is the backend service powering the Movix platform. It provides secure endpoints for authentication, movie discovery, user watchlists, reviews, and integration with external movie data sources like TMDb.

---

## ✨ Features

- 🧾 **RESTful API Endpoints** – Modular routes for movies, users, reviews, and more.  
- 🔐 **JWT Authentication** – Secure registration and login system.  
- 📁 **Watchlist Management** – Users can save and manage movies they want to watch.  
- 📝 **Reviews & Ratings** – Authenticated users can rate and review movies.  
- 🎥 **External API Integration** – Fetch real-time data from TMDb.  
- 🧪 **Input Validation & Error Handling** – Consistent, secure, and descriptive API responses.  
- ⚙️ **Scalable & Modular Codebase** – Easy to maintain and extend.  

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB  
- **ORM/ODM:** Mongoose  
- **Authentication:** JWT  
- **Validation:** Zod 
- **External API:** [TMDb API](https://www.themoviedb.org/documentation/api)  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/judeeseka/movix-backend.git
cd moviemate-api

# Install dependencies
npm install

# Set up environment variables
# (edit .env with your keys)


# Start the development server
npm run dev
```

---

## 📄 Environment Variables

Create a `.env` file with the following keys:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_connection_url
TMDB_API_KEY=your_tmdb_api_key
```

---

## 🧪 API Endpoints

### `POST /api/auth/register`

Registers a new user.

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "email": "jane@example.com"
  }
}
```

---

### `POST /api/auth/login`

Logs in a user and returns a JWT token.

**Request:**
```json
{
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "Jane Doe"
  }
}
```

---

### `GET /api/movies/trending`

Fetches trending movies from TMDb.

**Response:**
```json
{
  "results": [
    {
      "id": 123,
      "title": "Inception",
      "release_date": "2010-07-16",
      "rating": 8.8
    }
  ]
}
```

---

### `POST /api/users/me/watchlist`

Adds a movie to the user’s watchlist.

**Request (Authenticated):**
```json
{
  "id": 123,
  "title": "Inception"
}
```

---

### `GET /api/users/me/watchlist`

Fetches the authenticated user's watchlist.

---

## 🙌 Contributing

Contributions are welcome!  
- Fork the repository  
- Create a new feature branch
- Commit your changes
- Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Developed with ❤️ by [Your Name](https://github.com/your-username)
