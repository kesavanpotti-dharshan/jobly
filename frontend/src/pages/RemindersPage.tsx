import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function RemindersPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '32px', color: '#f1f5f9', minHeight: '100vh' }}>
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#a78bfa',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '24px',
        }}
      >
        <ArrowLeft size={16} /> Back to dashboard
      </button>
      <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px' }}>
        Reminders
      </h1>
      <p style={{ color: '#94a3b8', margin: 0 }}>
        Set and manage reminders for follow-ups and deadlines. [Coming soon]
      </p>
    </div>
  );
}
