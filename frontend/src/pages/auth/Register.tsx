import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { initMockAuth } from '../../api';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network registration handshake
    setTimeout(async () => {
      await initMockAuth(); // Attemps offline fallback payload
      localStorage.setItem('docsafe_token', 'demo-authorized-new-user-token');
      localStorage.setItem('docsafe_user_name', name);
      localStorage.setItem('docsafe_user_email', email);
      localStorage.setItem('docsafe_user_picture', '');
      navigate('/dashboard');
    }, 1200);
  };

  return (
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
            Join the secure ecosystem.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Create an enterprise administrative profile to architect your organization's compliance registry payload securely.
          </p>
        </div>
      </div>

      {/* Right Column - Register Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.5s ease' }}>
          
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>Create an account</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Establish your enterprise administrative profile.</p>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <User size={18} />
              </div>
              <input required type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" style={{
                width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', backgroundColor: 'transparent',
                border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
              }} onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'} />
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Mail size={18} />
              </div>
              <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Address" style={{
                width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', backgroundColor: 'transparent',
                border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
              }} onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'} />
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Lock size={18} />
              </div>
              <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Create Password" style={{
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
              {isLoading ? 'Encrypting Profile...' : <>Deploy Enterprise Profile <ArrowRight size={18} /></>}
            </button>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
              Already registered? <span onClick={() => navigate('/login')} style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}>Sign in here</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
