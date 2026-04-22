import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
import { BriefcaseBusiness, LogOut, BarChart3, Bell, FileText, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const user = useAuthStore((s) => s.user);
  const { data: dashboardData, isLoading, error } = useDashboard();

  const navItems = [
    { icon: BriefcaseBusiness, label: 'Applications', href: '/applications' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Bell, label: 'Reminders', href: '/reminders' },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: { bg: string; text: string; icon: string } } = {
      'Saved': { bg: 'rgba(148,163,184,0.15)', text: '#cbd5e1', icon: '📌' },
      'Applied': { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd', icon: '✈️' },
      'Interviewing': { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe', icon: '🎤' },
      'Offered': { bg: 'rgba(34,197,94,0.15)', text: '#86efac', icon: '🎉' },
      'Rejected': { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5', icon: '❌' },
    };
    return colors[status] || colors['Saved'];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'overdue';
    if (diff === 0) return 'today';
    if (diff === 1) return 'tomorrow';
    return `${diff} days`;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f1e', color: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', padding: '24px 16px', gap: '24px', position: 'fixed', height: '100vh', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
            <BriefcaseBusiness size={20} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Jobly</span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
                e.currentTarget.style.color = '#c4b5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: 'white', flexShrink: 0 }}>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#f1f5f9', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.firstName}
              </p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            style={{ width: '36px', height: '36px', background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '6px', color: '#fca5a5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.25)';
              e.currentTarget.style.color = '#fecaca';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
              e.currentTarget.style.color = '#fca5a5';
            }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '32px', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px', color: '#f1f5f9' }}>
            Welcome back, {user?.firstName}!
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Here's your job search progress at a glance.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            Loading your dashboard...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '16px', color: '#fca5a5', marginBottom: '24px' }}>
            Error loading dashboard. Please refresh the page.
          </div>
        )}

        {/* Stats Grid */}
        {!isLoading && dashboardData && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Total applications', value: dashboardData.totalApplications ?? 0, icon: '📋', color: '#93c5fd' },
                { label: 'Active applications', value: dashboardData.activeApplications ?? 0, icon: '⏳', color: '#d8b4fe' },
                { label: 'Interviews scheduled', value: dashboardData.interviews ?? 0, icon: '🎤', color: '#fbbf24' },
                { label: 'Offers received', value: dashboardData.offers ?? 0, icon: '🎉', color: '#86efac' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '28px', flexShrink: 0 }}>{stat.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 6px', fontWeight: 500 }}>{stat.label}</p>
                    <p style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: stat.color }}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Breakdown + Recent Apps Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {/* Status Breakdown */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} />
                  Status breakdown
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(dashboardData.statusBreakdown ?? []).map((status) => (
                    <div key={status.status}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 500 }}>{status.status}</span>
                        <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                          {status.count} ({status.percentage}%)
                        </span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            background: getStatusColor(status.status).text,
                            width: `${status.percentage}%`,
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Applications */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} />
                  Recent applications
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(dashboardData.recentApplications ?? []).length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>No recent applications</p>
                  ) : (
                    (dashboardData.recentApplications ?? []).map((app) => (
                      <div
                        key={app.id}
                        style={{
                          padding: '12px',
                          background: 'rgba(255,255,255,0.03)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        }}
                        onClick={() => navigate('/applications')}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                          <div>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', margin: 0 }}>{app.companyName}</p>
                            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>{app.roleTitle}</p>
                          </div>
                          <span
                            style={{
                              padding: '3px 8px',
                              background: getStatusColor(app.status).bg,
                              color: getStatusColor(app.status).text,
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 500,
                              flexShrink: 0,
                            }}
                          >
                            {app.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{formatDate(app.appliedDate)}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Upcoming Reminders */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} />
                Upcoming reminders
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(dashboardData.upcomingReminders ?? []).length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>No upcoming reminders</p>
                ) : (
                  (dashboardData.upcomingReminders ?? []).map((reminder) => (
                    <div
                      key={reminder.id}
                      style={{
                        padding: '12px',
                        background: reminder.completed ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
                        borderRadius: '8px',
                        borderLeft: `3px solid ${reminder.completed ? '#86efac' : '#fbbf24'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          {reminder.completed && <CheckCircle2 size={14} style={{ color: '#86efac' }} />}
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', margin: 0, textDecoration: reminder.completed ? 'line-through' : 'none' }}>
                            {reminder.title}
                          </p>
                        </div>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0' }}>{reminder.companyName}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: reminder.completed ? '#86efac' : '#fbbf24', margin: 0 }}>
                          {getDaysUntil(reminder.dueDate)}
                        </p>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>{formatDate(reminder.dueDate)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}