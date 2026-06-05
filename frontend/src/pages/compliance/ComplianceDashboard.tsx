import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

const ComplianceDashboard = () => {
  const policies = [
    { id: 1, name: 'Data Privacy Handling (GDPR)', status: 'ACTIVE', lastReviewed: '2023-10-01', riskLevel: 'Low' },
    { id: 2, name: 'Employee Code of Conduct', status: 'NEEDS_REVIEW', lastReviewed: '2022-05-15', riskLevel: 'Medium' },
    { id: 3, name: 'Financial Controls & Auditing', status: 'ACTIVE', lastReviewed: '2024-01-10', riskLevel: 'Critical' },
    { id: 4, name: 'Vendor Security Assessment', status: 'NON_COMPLIANT', lastReviewed: '2021-11-20', riskLevel: 'High' }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Compliance Matrix
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Monitor risk levels and global policy enforcement active status.
          </p>
        </div>
        <button style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          color: 'white',
          fontWeight: 600,
          backgroundColor: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-glow)',
          transition: 'all 0.2s'
        }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <RefreshCw size={18} /> Run Deep Audit
        </button>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Policy Directive</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Status</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Severity / Risk</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Audit</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>{policy.name}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
                    backgroundColor: policy.status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.15)' : policy.status === 'NEEDS_REVIEW' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: policy.status === 'ACTIVE' ? '#4ade80' : policy.status === 'NEEDS_REVIEW' ? '#facc15' : '#f87171'
                  }}>
                    {policy.status === 'ACTIVE' ? <ShieldCheck size={14} /> : <AlertCircle size={14} />}
                    {policy.status.replace('_', ' ')}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ 
                    fontWeight: 600, 
                    color: policy.riskLevel === 'Critical' || policy.riskLevel === 'High' ? '#f87171' : policy.riskLevel === 'Medium' ? '#facc15' : '#4ade80' 
                  }}>
                    {policy.riskLevel}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)' }}>{policy.lastReviewed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
