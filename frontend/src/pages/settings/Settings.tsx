import { User, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const profileName = localStorage.getItem('docsafe_user_name') || 'System Admin';
  const profileEmail = localStorage.getItem('docsafe_user_email') || 'admin@docsafe.app';
  const profilePic = localStorage.getItem('docsafe_user_picture');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Platform Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Manage your enterprise profile, security configurations, and webhooks.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Profile Card */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            {profilePic ? (
              <img src={profilePic} alt="Profile" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--border-color)', objectFit: 'cover' }} />
            ) : (
              <User size={24} color="var(--accent-primary)" />
            )}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Administrator Profile</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
              <input type="text" readOnly value={profileName} style={{ width: '100%', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', marginTop: '0.5rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <input type="text" readOnly value={profileEmail} style={{ width: '100%', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', marginTop: '0.5rem', outline: 'none' }} />
            </div>
          </div>
        </div>

        {/* Security Matrix */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Shield size={24} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Security & Authentication</h2>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '12px' }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Two-Factor Authentication (2FA)</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Protect your enterprise data with an additional security layer.</p>
            </div>
            <button style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', backgroundColor: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              Enable 2FA
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '12px', marginTop: '1rem' }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>API Access Keys</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your programmatic JWT tokens for external integrations.</p>
            </div>
            <button style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}>
              Manage Keys
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Bell size={24} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Webhooks & Alerts</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Slack and email automation routing settings will be configured completely during Phase 2 backend orchestration.</p>
        </div>

      </div>
    </div>
  );
};

export default Settings;
