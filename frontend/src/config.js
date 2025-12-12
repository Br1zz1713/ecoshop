// API configuration
let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Ensure protocol is present (Render provides host without protocol)
if (API_URL && !API_URL.startsWith('http')) {
    API_URL = `https://${API_URL}`;
}

export default API_URL;
