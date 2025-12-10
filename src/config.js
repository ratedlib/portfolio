// API Configuration
// For local development, the backend runs on localhost:5000
// For production, replace with your deployed backend URL (e.g., from Render)

const config = {
  // Change this to your deployed backend URL when you deploy
  // Example: 'https://portfolio-backend.onrender.com'
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // EmailJS Configuration
  // Get these from https://dashboard.emailjs.com/admin
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

export default config;

