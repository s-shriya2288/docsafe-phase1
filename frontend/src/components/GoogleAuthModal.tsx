import React from 'react';
import { useNavigate } from 'react-router-dom';

const accounts = [
  { name: 'shriya shrivastav', email: 'shriyashrivastav52@gmail.com', letter: 'S', color: '#bcaaa4' },
  { name: 'shriya shrivastav', email: 'shriyashrivastav17@gmail.com', letter: 'S', color: '#80cbc4' },
  { name: 'ss5264@srmist.edu.in', email: 'ss5264@srmist.edu.in', letter: 'S', color: '#bcaaa4' },
  { name: 'ns4663@srmist.edu.in', email: 'ns4663@srmist.edu.in', letter: 'N', color: '#f06292' },
  { name: 'xyz why not', email: 'whynotxyz30@gmail.com', letter: 'x', color: '#ba68c8' },
  { name: 'jk6314@srmist.edu.in', email: 'jk6314@srmist.edu.in', letter: 'J', color: '#81c784' },
  { name: 'ms6672@srmist.edu.in', email: 'ms6672@srmist.edu.in', letter: 'M', color: '#9575cd' },
  { name: 'Japleen kaur', email: 'japleenkaur3106@gmail.com', letter: 'J', color: '#f48fb1' }
];

export const GoogleAuthModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleSelect = (account: any) => {
    localStorage.setItem('docsafe_token', 'mock_google_token');
    localStorage.setItem('docsafe_user_name', account.name);
    localStorage.setItem('docsafe_user_email', account.email);
    localStorage.setItem('docsafe_user_picture', '');
    navigate('/dashboard');
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#111111', display: 'flex', justifyContent: 'center', zIndex: 10000,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
    }}>
      <div style={{
        marginTop: '6%',
        width: '100%',
        maxWidth: '1040px',
        backgroundColor: '#202124',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        
        <div style={{ height: '56px', borderBottom: '1px solid #3c4043', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '12px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style={{ color: '#e8eaed', fontSize: '14px', fontWeight: 500 }}>Sign in with Google</span>
        </div>

        <div style={{ display: 'flex', padding: '48px 64px' }}>
          
          <div style={{ flex: 1, paddingRight: '48px' }}>
            <div style={{ backgroundColor: 'white', display: 'inline-flex', padding: '8px', borderRadius: '8px', marginBottom: '32px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2c5ff6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h1 style={{ color: '#e8eaed', fontSize: '40px', fontWeight: 600, letterSpacing: '-0.5px', margin: '0 0 16px 0' }}>Choose an account</h1>
            <p style={{ color: '#e8eaed', fontSize: '16px', margin: 0 }}>to continue to <span style={{ color: '#8ab4f8', fontWeight: 500 }}>DocSafe</span></p>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {accounts.map((acc, i) => (
              <div 
                key={i} 
                onClick={() => handleSelect(acc)}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3c4043'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderBottom: i === accounts.length - 1 ? 'none' : '1px solid #3c4043',
                  cursor: 'pointer', transition: 'background-color 0.2s', borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: acc.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 500 }}>
                    {acc.letter}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#e8eaed', fontSize: '15px', fontWeight: 500 }}>{acc.name}</span>
                    <span style={{ color: '#9aa0a6', fontSize: '13px' }}>{acc.email}</span>
                  </div>
                </div>
                <span style={{ color: '#9aa0a6', fontSize: '12px' }}>Signed out</span>
              </div>
            ))}
            
            <div style={{ padding: '16px 16px', borderTop: '1px solid #3c4043', marginTop: '8px', color: '#e8eaed', fontSize: '15px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Use another account
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
