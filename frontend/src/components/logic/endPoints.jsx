// Use local backend for development
export const endPoint = process.env.NODE_ENV === 'production' 
  ? "https://portfolio-ik8s.onrender.com" 
  : "http://localhost:8080"
