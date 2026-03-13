import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';
import CountrySelect from '../components/CountrySelect';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
    const [countryCode, setCountryCode] = useState('+380');
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const { t } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let loginId = formData.username;
            // Check if input looks like a phone number (digits only)
            if (/^\d+$/.test(loginId)) {
                loginId = `${countryCode}${loginId.replace(/^0+/, '')}`;
            }
            // If it has @, treat as email (do nothing)

            await login(loginId, formData.password);
            toast.addToast('Login successful', 'success');
            // user object might not be updated immediately in context, wait for effect or check response if possible
            // But basic navigation works
            navigate('/');
        } catch (err) {
            console.error('Full Login Error:', err);
            let msg = 'Invalid credentials';
            if (err.response && err.response.data) {
                if (typeof err.response.data === 'string') {
                    msg = err.response.data.substring(0, 50);
                } else if (err.response.data.detail) {
                    msg = err.response.data.detail;
                } else {
                    const keys = Object.keys(err.response.data);
                    if (keys.length > 0) {
                        msg = `${keys[0]}: ${JSON.stringify(err.response.data[keys[0]])}`;
                    }
                }
            } else if (err.message) {
                msg = err.message;
            }
            setError(msg);
            toast.addToast('Login failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="container" style={{ maxWidth: '450px', width: '100%' }}>
                <div style={{
                    background: 'var(--color-surface)',
                    padding: '2.5rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Sign In</h2>

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: 'var(--color-error)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a3a3a3' }}>Email or Phone</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <CountrySelect value={countryCode} onChange={setCountryCode} />
                                <input
                                    className="input-field"
                                    placeholder="Enter email or phone..."
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    required
                                    style={{ flex: 1, padding: '0.875rem' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a3a3a3' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className="input-field"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password..."
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '0.875rem', paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: '#666',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button className="btn" type="submit" style={{ marginTop: '0.5rem', padding: '1rem', fontSize: '1rem' }}>Log In</button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
