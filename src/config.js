// API Configuration
// For local development, the backend runs on localhost:5000
// For production, replace with your deployed backend URL (e.g., from Render)

const config = {
  // Change this to your deployed backend URL when you deploy
  // Example: 'https://portfolio-backend.onrender.com'
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
};

export default config;

