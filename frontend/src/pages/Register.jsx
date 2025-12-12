import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import CountrySelect from '../components/CountrySelect';
import { useLanguage } from '../context/LanguageContext';

export default function Register() {
    const [countryCode, setCountryCode] = useState('+380');
    const [formData, setFormData] = useState({ phone_number: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSubmit = async (e) => {
        // ... same handler
        e.preventDefault();
        setError('');
        try {
            // Combine code + number for submission
            const fullPhone = `${countryCode}${formData.phone_number.replace(/^0+/, '')}`; // Remove leading zero if present
            await register({ ...formData, phone_number: fullPhone });
            navigate('/login');
        } catch (err) {
            // ... (error handling remains same, just verify imports/logic below)
            console.error(err);
            if (err.response && err.response.data) {
                const data = err.response.data;
                let msg = '';
                if (typeof data === 'object') {
                    for (const key in data) {
                        const val = data[key];
                        if (Array.isArray(val)) {
                            // Friendly mapping
                            if (key === 'phone_number' && val[0].includes('already exists')) {
                                msg += "This phone number is already registered.\n";
                            } else if (key === 'email' && val[0].includes('already exists')) {
                                msg += "This email is already linked to an account.\n";
                            } else {
                                msg += `${val[0]}\n`;
                            }
                        } else {
                            msg += `${val}\n`;
                        }
                    }
                } else {
                    msg = "Registration failed. Please try again.";
                }
                setError(msg.trim());
            } else {
                setError('Registration failed. Please try again.');
            }
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
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Create Account</h2>
                    {error && <p style={{ color: 'var(--color-error)', textAlign: 'center', wordBreak: 'break-word', marginBottom: '1.5rem' }}>{error}</p>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a3a3a3' }}>Phone Number</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <CountrySelect value={countryCode} onChange={setCountryCode} />
                                <input
                                    className="input-field"
                                    placeholder={t('auth.your_number')}
                                    value={formData.phone_number}
                                    onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                                    required
                                    style={{ flex: 1, padding: '0.875rem' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a3a3a3' }}>Email Address</label>
                            <input
                                className="input-field"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.875rem' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a3a3a3' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className="input-field"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password..."
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

                        <button className="btn" type="submit" style={{ marginTop: '0.5rem', padding: '1rem', fontSize: '1rem' }}>Register</button>
                    </form>
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
