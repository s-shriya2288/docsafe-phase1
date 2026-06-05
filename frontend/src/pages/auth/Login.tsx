import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { initMockAuth } from '../../api';
import { GoogleAuthModal } from '../../components/GoogleAuthModal';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network authentication handshake
    setTimeout(async () => {
      await initMockAuth(); // Attempts localhost real auth, falls back automatically
      localStorage.setItem('docsafe_token', 'demo-authorized-admin-token');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <>
      {showGoogleModal && <GoogleAuthModal onClose={() => setShowGoogleModal(false)} />}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'inherit'
      }}>
        
        {/* Left Column - Branding */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glow effect */}
          <div style={{
            position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: 'var(--accent-primary)', padding: '0.6rem', borderRadius: '12px', boxShadow: 'var(--shadow-glow)' }}>
                <ShieldCheck size={32} color="white" />
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>DocSafe</h1>
            </div>
            
            <h2 style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Fortify your compliance architecture.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Enterprise-grade document registry and algorithmic policy tracking. Sign in to access your secure ecosystem.
            </p>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.5s ease' }}>
            
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>Welcome back</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Please enter your administrative credentials.</p>
            </div>

            <button type="button" onClick={() => setShowGoogleModal(true)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              padding: '0.85rem', width: '100%', backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
              fontWeight: 500, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: '1.5rem'
            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0 0 1rem 0' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or continue with email</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  <Mail size={18} />
                </div>
                <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@company.com" style={{
                  width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', backgroundColor: 'transparent',
                  border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                  fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
                }} onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'} />
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  <Lock size={18} />
                </div>
                <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" style={{
                  width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', backgroundColor: 'transparent',
                  border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                  fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
                }} onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'} />
              </div>

              <button type="submit" disabled={isLoading} style={{
                marginTop: '1rem', padding: '0.9rem', borderRadius: '12px',
                backgroundColor: 'var(--accent-primary)', color: 'white', fontWeight: 600,
                fontSize: '1rem', border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: 'var(--shadow-glow)', transition: 'transform 0.2s', opacity: isLoading ? 0.7 : 1
              }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                {isLoading ? 'Authenticating...' : <>Secure Sign In <ArrowRight size={18} /></>}
              </button>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
                Don't have an account? <span onClick={() => navigate('/register')} style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}>Create an account</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
