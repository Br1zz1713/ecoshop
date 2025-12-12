import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext.jsx';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // { phone_number, email, is_staff, ... }
    const [tokens, setTokens] = useState(() => {
        try {
            const saved = localStorage.getItem('tokens');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Failed to parse tokens", e);
            localStorage.removeItem('tokens');
            return null;
        }
    });
    const [loading, setLoading] = useState(true);
    const toast = useToast(); // FIXED: Moved hook call to top level

    useEffect(() => {
        if (tokens) {
            localStorage.setItem('tokens', JSON.stringify(tokens));
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
            // Fetch user profile
            axios.get('/api/me/')
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.error('Failed to fetch profile', err);
                    // Silent failure or handle logout
                    setTokens(null);
                    setUser(null);
                });
        } else {
            localStorage.removeItem('tokens');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        }
        setLoading(false);
    }, [tokens, toast]);

    const login = async (username, password) => {
        try {
            const res = await axios.post('/api/token/', {
                username,
                password
            });
            setTokens(res.data);
            return true;
        } catch (err) {
            console.error("Login failed", err);
            throw err;
        }
    };

    const logout = () => {
        setTokens(null);
    };

    const register = async (userData) => {
        try {
            await axios.post('/api/register/', userData);
            return true;
        } catch (err) {
            console.error("Registration failed", err);
            throw err;
        }
    };

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
                color: '#22c55e'
            }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>EcoDeviva</div>
                <div style={{ marginTop: '1rem', color: '#a3a3a3' }}>Initializing Application...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
