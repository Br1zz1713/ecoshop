// API configuration
// In production (Vercel), frontend and backend are on the same domain.
// Use an empty string so axios requests are relative (e.g. /api/products/)
let API_URL = import.meta.env.PROD 
    ? "" 
    : (import.meta.env.VITE_API_URL || 'http://localhost:8000');

// Ensure protocol is present for local development if provided without it
if (API_URL && !API_URL.startsWith('http') && !API_URL.startsWith('https') && API_URL !== "") {
    API_URL = `https://${API_URL}`;
}

export default API_URL;
