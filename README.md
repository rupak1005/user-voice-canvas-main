# User Voice Canvas

A full-stack feedback collection app built with React (frontend) and Node.js/Express + MongoDB (backend).

live: https://user-voice-canvas-main-5.onrender.com/

## Features

- Submit feedback with name, email, category, and message
- View all feedback in a dashboard
- Categories: Suggestion, Bug Report, Feature Request
- Stores feedback in MongoDB (local or Atlas)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas/database))

### Backend Setup

1. Install dependencies:
    ```bash
    cd feedback-backend
    npm install
    ```

2. Configure MongoDB connection in `server.js`:
    - For local:  
      `mongodb://localhost:27017/feedback`
    - For Atlas:  
      `mongodb+srv://<username>:<password>@cluster0.mongodb.net/feedback?retryWrites=true&w=majority`

3. Start the backend:
    ```bash
    node server.js
    ```

### Frontend Setup

1. Install dependencies:
    ```bash
    cd ..
    npm install
    ```

2. Start the frontend:
    ```bash
    npm run dev
    ```
    The app will be available at [http://localhost:5173](http://localhost:5173) (or similar).

## API Endpoints

- `POST /feedback` — Submit feedback
- `GET /feedback` — Get all feedback

## Project Structure

```user-voice-canvas-main/
├── src/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ └── ...
├── feedback-backend/
│ └── server.js
└── ...
```
## License

MIT
