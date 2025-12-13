import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Load theme from localStorage or default to 'dark'
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem('theme');
            return saved || 'dark';
        } catch (e) {
            console.error('Failed to load theme from localStorage', e);
            return 'dark';
        }
    });

    useEffect(() => {
        // Save theme to localStorage and apply to document
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.error('Failed to save theme to localStorage', e);
        }
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
